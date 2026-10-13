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
import { ORDERING_ENABLED } from '../config'

export default function MenuExperience() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [booting, setBooting] = useState(true)

  // Simulate initial data load to show elegant skeleton
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 450)
    return () => clearTimeout(t)
  }, [])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-[100svh] bg-[var(--bg)] text-[var(--ink)]">
      <Navbar
        onSearch={() => setSearchOpen(true)}
        ordering={ORDERING_ENABLED}
      />
      <main>
        <Hero onExplore={scrollToMenu} />
        <Featured ordering={ORDERING_ENABLED} onOpenProduct={setSelected} />
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
      <ProductSheet
        product={selected}
        onClose={() => setSelected(null)}
        ordering={ORDERING_ENABLED}
      />
      {ORDERING_ENABLED && <Checkout />}
      {ORDERING_ENABLED && <FloatingCart />}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenProduct={(p) => {
          setSearchOpen(false)
          setSelected(p)
        }}
        ordering={ORDERING_ENABLED}
      />
    </div>
  )
}
