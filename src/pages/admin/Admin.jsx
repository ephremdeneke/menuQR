import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  ClipboardList,
  ChefHat,
  Coffee,
  Layers,
  QrCode,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import Dashboard from './Dashboard'
import Kitchen from './Kitchen'
import Orders from './Orders'
import MenuManage from './MenuManage'
import Categories from './Categories'
import QRCodes from './QRCodes'
import Login from './Login'
import SettingsPage from './Settings'
import { useAuth } from '../../authStore'

const sections = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', name: 'Orders', icon: ClipboardList },
  { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
  { id: 'menu', name: 'Menu', icon: Coffee },
  { id: 'categories', name: 'Categories', icon: Layers },
  { id: 'qrcodes', name: 'QR Codes', icon: QrCode },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
]

export default function Admin() {
  const { user, logout } = useAuth()
  const [section, setSection] = useState('dashboard')
  const [mobileNav, setMobileNav] = useState(false)

  // Auth guard: show login screen until signed in
  if (!user) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-[#f5f2ec] font-sans text-[#241a16]">
      <div className="flex">
        {/* Sidebar (desktop) */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[#e5ded2] bg-[#fbf9f4] lg:flex">
          <div className="flex items-center gap-2 border-b border-[#e5ded2] px-6 py-5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#241a16] font-display text-lg font-bold text-white">
              S
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold">Sinan Admin</p>
              {user && (
                <p className="text-[11px] uppercase tracking-wider text-[#a89a88]">
                  {user.username} · Management
                </p>
              )}
            </div>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
            {sections.map((s) => {
              const Icon = s.icon
              const isActive = section === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#241a16] text-white'
                      : 'text-[#5c4f40] hover:bg-[#efe9dd]'
                  }`}
                >
                  <Icon size={18} />
                  {s.name}
                </button>
              )
            })}
          </nav>
          <div className="border-t border-[#e5ded2] p-3">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#5c4f40] hover:bg-[#efe9dd]"
            >
              <LogOut size={18} /> Sign out
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#e5ded2] bg-[#fbf9f4] px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#241a16] font-display text-base font-bold text-white">
              S
            </span>
            <span className="font-display text-lg font-semibold">Sinan Admin</span>
          </div>
          <button
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Toggle navigation"
            aria-expanded={mobileNav}
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#5c4f40] hover:bg-[#efe9dd]"
          >
            Menu
          </button>
        </div>
        {mobileNav && (
          <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileNav(false)}>
            <nav
              className="absolute left-0 top-0 h-full w-64 space-y-0.5 bg-[#fbf9f4] p-3 pt-16"
              onClick={(e) => e.stopPropagation()}
            >
              {sections.map((s) => {
                const Icon = s.icon
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSection(s.id)
                      setMobileNav(false)
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium ${
                      section === s.id ? 'bg-[#241a16] text-white' : 'text-[#5c4f40]'
                    }`}
                  >
                    <Icon size={18} /> {s.name}
                  </button>
                )
              })}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 px-4 pb-10 pt-20 lg:ml-64 lg:px-8 lg:pt-8">
          {section === 'dashboard' && <Dashboard />}
          {section === 'orders' && <Orders />}
          {section === 'kitchen' && <Kitchen />}
          {section === 'menu' && <MenuManage />}
          {section === 'categories' && <Categories />}
          {section === 'qrcodes' && <QRCodes />}
          {section === 'settings' && <SettingsPage />}
          {section === 'analytics' && (
            <Placeholder title={sections.find((s) => s.id === section)?.name} />
          )}
        </main>
      </div>
    </div>
  )
}

function Placeholder({ title }) {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-[#8a7a68]">
        Module scaffolded — connect your data to populate.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl border border-[#e5ded2] bg-white p-4 shadow-sm" />
        ))}
      </div>
    </div>
  )
}
