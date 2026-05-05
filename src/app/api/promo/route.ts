// src/app/api/promo/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { code } = await req.json()
    if (!code) return NextResponse.json({ valid: false, message: 'Code manquant.' })

    const promo = await prisma.promoCode.findFirst({
      where: {
        code: code.toUpperCase(),
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } },
        ],
      },
    })

    if (!promo) return NextResponse.json({ valid: false, message: 'Code promo invalide ou expiré.' })

    if (promo.usageLimit && promo.usageCount >= promo.usageLimit) {
      return NextResponse.json({ valid: false, message: 'Ce code a atteint sa limite d\'utilisation.' })
    }

    return NextResponse.json({ valid: true, discount: promo.discount, code: promo.code })
  } catch {
    return NextResponse.json({ valid: false, message: 'Erreur serveur.' }, { status: 500 })
  }
}
