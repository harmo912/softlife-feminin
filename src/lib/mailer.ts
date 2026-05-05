// src/lib/mailer.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendOrderConfirmation(order: {
  orderNumber: string
  email: string
  firstName: string
  total: number
  items: Array<{ name: string; quantity: number; price: number; size: string; color: string }>
}) {
  const itemsHtml = order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f5d0d8;">${i.name}<br>
          <small style="color:#8a7a7e;">${i.size} — ${i.color}</small>
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #f5d0d8;text-align:center;">${i.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f5d0d8;text-align:right;">
          ${new Intl.NumberFormat('fr-FR').format(i.price * i.quantity)} XOF
        </td>
      </tr>`
    )
    .join('')

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'Softlife Féminin <harmohlb01@gmail.com>',
    to: order.email,
    subject: `Confirmation de commande #${order.orderNumber} — Softlife Féminin`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:'DM Sans',Arial,sans-serif;background:#FDF8F5;margin:0;padding:0;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;">
    <div style="background:#2A1A1E;padding:32px 40px;text-align:center;">
      <h1 style="font-family:Georgia,serif;color:#FDF8F5;font-weight:300;font-size:28px;margin:0;">
        Softlife <em style="color:#e87a92;">Féminin</em>
      </h1>
      <p style="color:#C4963A;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:8px 0 0;">
        SemHarmo Business
      </p>
    </div>
    <div style="padding:40px;">
      <h2 style="color:#2A1A1E;font-size:20px;font-weight:500;">
        Merci, ${order.firstName} !
      </h2>
      <p style="color:#8a7a7e;font-size:14px;">
        Votre commande <strong>#${order.orderNumber}</strong> a bien été reçue et est en cours de traitement.
      </p>
      <table style="width:100%;margin:24px 0;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#FDF8F5;">
            <th style="padding:10px 0;text-align:left;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a7a7e;">Produit</th>
            <th style="padding:10px 0;text-align:center;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a7a7e;">Qté</th>
            <th style="padding:10px 0;text-align:right;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a7a7e;">Prix</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:16px 0;font-weight:600;font-size:15px;">Total</td>
            <td style="padding:16px 0;font-weight:600;font-size:15px;text-align:right;color:#C8526A;">
              ${new Intl.NumberFormat('fr-FR').format(order.total)} XOF
            </td>
          </tr>
        </tfoot>
      </table>
      <p style="color:#8a7a7e;font-size:13px;line-height:1.6;">
        Pour toute question, répondez à cet email ou contactez-nous sur WhatsApp au
        <strong>+229 01 46 37 31 76</strong>.
      </p>
    </div>
    <div style="background:#2A1A1E;padding:20px 40px;text-align:center;">
      <p style="color:rgba(253,248,245,0.4);font-size:11px;margin:0;">
        © 2024 Softlife Féminin — SemHarmo Business · Cotonou, Bénin
      </p>
    </div>
  </div>
</body>
</html>
    `,
  })
}
