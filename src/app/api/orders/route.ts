// src/app/api/orders/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { sendOrderConfirmation } from '@/lib/mailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      firstName, lastName, email, phone, address, city, country,
      paymentMethod, items, total, shippingFee, promoCode, discount,
    } = body

    // Validation basique
    if (!firstName || !lastName || !email || !phone || !address || !city || !items?.length) {
      return NextResponse.json({ message: 'Données manquantes.' }, { status: 400 })
    }

    // Vérifier le code promo
    let validatedPromo = null
    if (promoCode) {
      validatedPromo = await prisma.promoCode.findFirst({
        where: { code: promoCode.toUpperCase(), active: true },
      })
    }

    const orderNumber = generateOrderNumber()

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        orderNumber,
        firstName, lastName, email, phone, address, city, country,
        paymentMethod, total, shippingFee: shippingFee ?? 0,
        promoCode: validatedPromo?.code,
        discount: discount ?? 0,
        status: 'PENDING',
        items: {
          create: items.map((item: {
            productId: string; size: string; color: string;
            quantity: number; price: number
          }) => ({
            productId: item.productId,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    })

    // Incrémenter l'utilisation du code promo
    if (validatedPromo) {
      await prisma.promoCode.update({
        where: { id: validatedPromo.id },
        data: { usageCount: { increment: 1 } },
      })
    }

    // Email de confirmation (non bloquant)
    sendOrderConfirmation({
      orderNumber,
      email,
      firstName,
      total,
      items: order.items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.price,
        size: i.size,
        color: i.color,
      })),
    }).catch(console.error)

    return NextResponse.json({ orderNumber, orderId: order.id }, { status: 201 })
  } catch (err) {
    console.error('Order error:', err)
    return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 })
  }
}
