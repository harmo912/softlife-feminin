// src/app/compte/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/compte')

  const orders = await prisma.order.findMany({
    where: { email: session.user.email! },
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { items: { include: { product: true } } },
  })

  const STATUS_LABELS: Record<string, string> = {
    PENDING: 'En attente', PAID: 'Payée', PROCESSING: 'En préparation',
    SHIPPED: 'Expédiée', DELIVERED: 'Livrée', CANCELLED: 'Annulée', REFUNDED: 'Remboursée',
  }
  const STATUS_COLORS: Record<string, string> = {
    PENDING: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    PAID: 'text-blue-600 bg-blue-50 border-blue-200',
    PROCESSING: 'text-purple-600 bg-purple-50 border-purple-200',
    SHIPPED: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    DELIVERED: 'text-green-600 bg-green-50 border-green-200',
    CANCELLED: 'text-red-600 bg-red-50 border-red-200',
    REFUNDED: 'text-gray-600 bg-gray-50 border-gray-200',
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs tracking-widest uppercase text-or mb-1">Espace client</p>
          <h1 className="font-display text-4xl font-light text-encre">
            Bonjour, {session.user.name?.split(' ')[0] ?? 'vous'} !
          </h1>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button className="text-sm text-gris hover:text-rose transition-colors">Se déconnecter</button>
        </form>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { label: 'Commandes', value: orders.length },
          { label: 'Livrées', value: orders.filter(o => o.status === 'DELIVERED').length },
          { label: 'En cours', value: orders.filter(o => ['PENDING','PAID','PROCESSING','SHIPPED'].includes(o.status)).length },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-rose-pale rounded-2xl p-6 text-center">
            <div className="font-display text-3xl font-light text-rose">{s.value}</div>
            <div className="text-xs text-gris mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Commandes */}
      <div>
        <h2 className="font-display text-2xl font-light text-encre mb-6">Mes commandes</h2>
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white border border-rose-pale rounded-2xl">
            <p className="text-gris mb-4">Vous n'avez pas encore passé de commande.</p>
            <Link href="/boutique" className="text-sm text-rose hover:underline">Découvrir la boutique</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-rose-pale rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-medium text-encre text-sm">#{order.orderNumber}</p>
                    <p className="text-xs text-gris mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                    <span className="font-medium text-encre text-sm">{formatPrice(order.total)}</span>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {order.items.map((item) => (
                    <div key={item.id} className="text-xs bg-creme border border-rose-pale rounded-lg px-3 py-2">
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-gris ml-1">×{item.quantity} · {item.size} · {item.color}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
