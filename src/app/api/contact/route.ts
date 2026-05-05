// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Champs manquants.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Softlife Féminin <harmohlb01@gmail.com>',
      to: 'harmohlb01@gmail.com',
      replyTo: email,
      subject: `[Contact Softlife] ${subject || 'Message'} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;">
          <h2 style="color:#2A1A1E;">Nouveau message — Softlife Féminin</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
          ${subject ? `<p><strong>Sujet :</strong> ${subject}</p>` : ''}
          <p><strong>Message :</strong></p>
          <div style="background:#FDF8F5;padding:16px;border-radius:8px;border-left:3px solid #C8526A;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ message: 'Erreur serveur.' }, { status: 500 })
  }
}
