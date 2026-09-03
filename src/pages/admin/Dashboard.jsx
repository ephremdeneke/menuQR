import {
  TrendingUp,
  ShoppingBag,
  Receipt,
  Soup,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

const stats = [
  { label: "Today's Sales", value: '8,450 ETB', change: '+12%', up: true, icon: TrendingUp },
  { label: 'Orders', value: '42', change: '+8%', up: true, icon: ShoppingBag },
  { label: 'Average Order', value: '201 ETB', change: '+3%', up: true, icon: Receipt },
  { label: 'Top Product', value: 'Macchiato', change: 'Sold 28', up: true, icon: Soup },
]

// CSS-only bar chart for daily revenue
const dailyRevenue = [
  { day: 'S', v: 40 },
  { day: 'M', v: 60 },
  { day: 'T', v: 45 },
  { day: 'W', v: 75 },
  { day: 'T', v: 55 },
  { day: 'F', v: 90 },
  { day: 'S', v: 80 },
]

const topProducts = [
  { name: 'Macchiato', pct: 100, sales: 28 },
  { name: 'Ethiopian Coffee', pct: 86, sales: 24 },
  { name: 'Latte', pct: 71, sales: 20 },
  { name: 'Jebena Ceremony', pct: 57, sales: 16 },
  { name: 'Croissant', pct: 43, sales: 12 },
]

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-[#8a7a68]">Overview of today’s performance</p>
        </div>
        <span className="rounded-full bg-[#83bf6f]/20 px-3 py-1 text-xs font-semibold text-[#4d7a3d]">
          Open
        </span>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-2xl border border-[#e5ded2] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#241a16]/5 text-[#6b4a36]">
                  <Icon size={18} />
                </span>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    s.up ? 'text-[#4d7a3d]' : 'text-[#c2452e]'
                  }`}
                >
                  {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {s.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-[#8a7a68]">{s.label}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Daily revenue chart */}
        <div className="rounded-2xl border border-[#e5ded2] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Daily Revenue</h2>
            <span className="text-xs text-[#8a7a68]">This week</span>
          </div>
          <div className="mt-6 flex h-44 items-end gap-3">
            {dailyRevenue.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className="w-full rounded-t-md bg-[#b88a52] transition-all"
                  style={{ height: `${d.v}%` }}
                />
                <span className="text-[11px] text-[#8a7a68]">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="rounded-2xl border border-[#e5ded2] bg-white p-5 shadow-sm">
          <h2 className="font-display text-xl font-semibold">Popular Products</h2>
          <div className="mt-4 space-y-3">
            {topProducts.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-[#8a7a68]">{p.sales} sold</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-[#efe9dd]">
                  <div
                    className="h-2 rounded-full bg-[#241a16]"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
