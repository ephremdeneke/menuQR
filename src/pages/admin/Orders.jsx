import { useState } from 'react'
import { Search, MoreVertical } from 'lucide-react'

const initialOrders = [
  { id: '#SIN-1024', table: 'T05', items: 3, total: '350 ETB', status: 'Preparing', time: '2m ago' },
  { id: '#SIN-1023', table: 'T02', items: 1, total: '350 ETB', status: 'New', time: '5m ago' },
  { id: '#SIN-1022', table: 'T09', items: 2, total: '260 ETB', status: 'Completed', time: '18m ago' },
  { id: '#SIN-1021', table: 'T07', items: 3, total: '420 ETB', status: 'Preparing', time: '8m ago' },
  { id: '#SIN-1020', table: 'T01', items: 1, total: '130 ETB', status: 'Completed', time: '32m ago' },
  { id: '#SIN-1019', table: 'T04', items: 4, total: '580 ETB', status: 'Cancelled', time: '41m ago' },
]

const statusStyle = {
  'New': 'bg-[#c2452e]/10 text-[#c2452e]',
  'Preparing': 'bg-[#5b7fb0]/10 text-[#5b7fb0]',
  'Completed': 'bg-[#83bf6f]/15 text-[#4d7a3d]',
  'Cancelled': 'bg-[#e5ded2] text-[#8a7a68]',
}

export default function Orders() {
  const [q, setQ] = useState('')
  const [orders] = useState(initialOrders)
  const filtered = orders.filter(
    (o) => o.id.includes(q.toUpperCase()) || o.table.includes(q.toUpperCase())
  )

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Orders</h1>
          <p className="text-sm text-[#8a7a68]">All customer orders</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[#e5ded2] bg-white px-3 py-2">
          <Search size={15} className="text-[#8a7a68]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search order or table"
            className="w-40 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#e5ded2] bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5ded2] text-xs uppercase tracking-wider text-[#8a7a68]">
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 font-semibold">Table</th>
              <th className="px-4 py-3 font-semibold">Items</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Time</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr
                key={o.id}
                className="border-b border-[#f0ece3] transition-colors hover:bg-[#fbf9f4]"
              >
                <td className="px-4 py-3 font-mono font-semibold">{o.id}</td>
                <td className="px-4 py-3">{o.table}</td>
                <td className="px-4 py-3">{o.items}</td>
                <td className="px-4 py-3 font-medium">{o.total}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      statusStyle[o.status]
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#8a7a68]">{o.time}</td>
                <td className="px-4 py-3 text-[#8a7a68]">
                  <MoreVertical size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
