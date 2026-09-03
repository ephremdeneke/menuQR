import { useState } from 'react'
import { Play, Check, AlertCircle } from 'lucide-react'

const initialOrders = [
  {
    id: '#SIN-1024',
    table: 'T05',
    status: 'new',
    items: [
      { qty: 2, name: 'Latte' },
      { qty: 1, name: 'Croissant' },
    ],
    note: 'Less sugar',
    time: '2m',
  },
  {
    id: '#SIN-1023',
    table: 'T02',
    status: 'new',
    items: [{ qty: 1, name: 'Jebena Ceremony Special' }],
    note: '',
    time: '5m',
  },
  {
    id: '#SIN-1021',
    table: 'T07',
    status: 'preparing',
    items: [
      { qty: 1, name: 'Macchiato' },
      { qty: 2, name: 'Ful Medames' },
    ],
    note: 'Extra injera',
    time: '8m',
  },
  {
    id: '#SIN-1018',
    table: 'T03',
    status: 'ready',
    items: [
      { qty: 3, name: 'Ethiopian Coffee' },
      { qty: 1, name: 'Cheesecake' },
    ],
    note: '',
    time: '12m',
  },
]

const columns = [
  { id: 'new', label: 'New', color: '#c2452e' },
  { id: 'confirmed', label: 'Confirmed', color: '#b88a52' },
  { id: 'preparing', label: 'Preparing', color: '#5b7fb0' },
  { id: 'ready', label: 'Ready', color: '#4d7a3d' },
]

const next = { new: 'confirmed', confirmed: 'preparing', preparing: 'ready' }

export default function Kitchen() {
  const [orders, setOrders] = useState(initialOrders)

  const advance = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: next[o.status] || o.status } : o))
    )
  }

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Kitchen Display</h1>
          <p className="text-sm text-[#8a7a68]">Live order pipeline</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#83bf6f]/20 px-3 py-1 text-xs font-semibold text-[#4d7a3d]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#4d7a3d]" /> Live
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => {
          const colOrders = orders.filter((o) => o.status === col.id)
          return (
            <div
              key={col.id}
              className="rounded-2xl border border-[#e5ded2] bg-[#fbf9f4] p-3"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <h2
                  className="font-sans text-xs font-bold uppercase tracking-wider"
                  style={{ color: col.color }}
                >
                  {col.label}
                </h2>
                <span className="text-sm font-bold text-[#8a7a68]">{colOrders.length}</span>
              </div>
              <div className="space-y-3">
                {colOrders.length === 0 && (
                  <div className="flex flex-col items-center rounded-xl border border-dashed border-[#e5ded2] py-8 text-[#b6aa99]">
                    <AlertCircle size={20} />
                    <p className="mt-1 text-xs">Empty</p>
                  </div>
                )}
                {colOrders.map((o) => (
                  <div key={o.id} className="rounded-2xl border border-[#e5ded2] bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold">{o.id}</span>
                      <span className="rounded-full bg-[#241a16] px-2 py-0.5 text-[11px] font-semibold text-white">
                        Table {o.table}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {o.items.map((it, i) => (
                        <li key={i} className="text-sm text-[#5c4f40]">
                          <span className="font-semibold">{it.qty} ×</span> {it.name}
                        </li>
                      ))}
                    </ul>
                    {o.note && (
                      <p className="mt-2 rounded-lg bg-[#b88a52]/10 px-2 py-1 text-xs italic text-[#6b4a36]">
                        “{o.note}”
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-[#b6aa99]">{o.time} ago</span>
                      {o.status !== 'ready' ? (
                        <button
                          onClick={() => advance(o.id)}
                          className="flex items-center gap-1 rounded-full bg-[#241a16] px-3 py-1.5 text-xs font-semibold text-white transition active:scale-95"
                        >
                          {o.status === 'preparing' ? (
                            <>
                              <Check size={13} /> Mark Ready
                            </>
                          ) : (
                            <>
                              <Play size={13} /> Start
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-[#4d7a3d]">
                          <Check size={13} /> Served
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
