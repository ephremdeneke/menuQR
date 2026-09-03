import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import MenuSection from '../components/MenuSection'
import ProductSheet from '../components/ProductSheet'
import FloatingCart from '../components/FloatingCart'
import Checkout from '../components/Checkout'
import SearchOverlay from '../components/SearchOverlay'
import Story from '../components/Story'
import Footer from '../components/Footer'
import { products } from '../data/menu'
import { useApp } from '../store'
import { useTableParam } from '../lib/hooks'

export default function MenuExperience() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [booting, setBooting] = useState(true)

  const urlTable = useTableParam()
  const setTable = useApp((s) => s.setTable)

  // Read table from URL into store
  useEffect(() => {
    if (urlTable) setTable(urlTable)
  }, [urlTable, setTable])

  // Simulate initial data load to show elegant skeleton
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-[100svh] bg-[var(--bg)] text-[var(--ink)]">
      <Navbar onSearch={() => setSearchOpen(true)} />
      <main>
        <Hero onExplore={scrollToMenu} />
        <Featured />
        <div id="menu">
          <MenuSection
            active={active}
            onSelect={setActive}
            onOpenProduct={setSelected}
            skeleton={booting}
          />
        </div>
        <Story />
        <Footer />
      </main>

      {/* Overlays & sheets */}
      <ProductSheet product={selected} onClose={() => setSelected(null)} />
      <Checkout />
      <FloatingCart />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenProduct={(p) => {
          setSearchOpen(false)
          setSelected(p)
        }}
      />
    </div>
  )
}
