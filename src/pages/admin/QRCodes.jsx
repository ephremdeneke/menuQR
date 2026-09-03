import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Plus, Minus, Download, Copy, Coffee, ChevronDown } from 'lucide-react'

// General menu URL — no table param (table-based scanning is a future feature)
function menuUrl() {
  const base = window.location.origin + window.location.pathname.replace(/\/admin.*/, '')
  return `${base}/sinan`
}

// Optional per-table URL (kept for future releases)
function tableUrl(table) {
  return `${menuUrl()}?table=${table}`
}

const defaultTables = ['T01', 'T02', 'T03', 'T04', 'T05']

export default function QRCodes() {
  const [menuLink, setMenuLink] = useState('')
  const [copied, setCopied] = useState(null)
  const [size, setSize] = useState(180)
  const [showTables, setShowTables] = useState(false)
  const [tables, setTables] = useState(defaultTables)

  useEffect(() => {
    setMenuLink(menuUrl())
  }, [])

  const addTable = () => {
    const nums = tables.map((t) => parseInt(t.replace(/\D/g, ''), 10) || 0)
    const next = (Math.max(0, ...nums) + 1).toString().padStart(2, '0')
    setTables((t) => [...t, `T${next}`])
  }
  const removeTable = (t) => setTables((ts) => ts.filter((x) => x !== t))

  const download = (id, name) => {
    const svg = document.getElementById(`qr-${id}`)
    if (!svg) return
    const outer = document.createElement('div')
    outer.innerHTML = svg.outerHTML
    const innerSvg = outer.querySelector('svg')
    innerSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    innerSvg.setAttribute('width', '1024')
    innerSvg.setAttribute('height', '1024')
    const blob = new Blob([outer.innerHTML.replaceAll('\n', '')], {
      type: 'image/svg+xml;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">QR Code</h1>
          <p className="text-sm text-[#8a7a68]">
            One general QR that opens the menu — no table needed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-xs text-[#8a7a68]">QR size</span>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="rounded-lg border border-[#e5ded2] bg-white px-2 py-2 text-sm"
            aria-label="QR size"
          >
            <option value={120}>Small</option>
            <option value={180}>Medium</option>
            <option value={240}>Large</option>
          </select>
        </div>
      </div>

      {/* General menu QR card */}
      <div className="mt-6 flex flex-col items-center rounded-3xl border border-[#e5ded2] bg-white p-8 text-center shadow-sm md:flex-row md:gap-8 md:text-left">
        <div className="shrink-0 rounded-2xl border border-[#f0ece3] p-3">
          <QRCodeSVG
            id="qr-menu"
            value={menuLink}
            size={size}
            level="M"
            fgColor="#241a16"
            bgColor="#ffffff"
            includeMargin={false}
          />
        </div>
        <div className="mt-6 md:mt-0">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Coffee size={18} className="text-[#6b4a36]" />
            <h2 className="font-display text-2xl font-semibold">Menu QR</h2>
          </div>
          <p className="mt-2 max-w-sm text-sm text-[#8a7a68]">
            Print this once and place it in your cafe. Anyone who scans it lands directly on
            the Sinan Cafe menu.
          </p>
          <code className="mt-3 inline-block max-w-full truncate rounded-lg bg-[#f5f2ec] px-3 py-1.5 text-xs text-[#6b4a36]">
            {menuLink}
          </code>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => download('menu', 'sinan-menu-qr')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#241a16] px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95"
            >
              <Download size={15} /> Download SVG
            </button>
            <button
              onClick={() => copy(menuLink, 'menu')}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#e5ded2] px-4 py-2.5 text-sm font-semibold text-[#5c4f40] transition active:scale-95"
            >
              <Copy size={15} /> {copied === 'menu' ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>

      {/* Per-table QR (future feature, kept hidden by default) */}
      <div className="mt-8">
        <button
          onClick={() => setShowTables(!showTables)}
          className="flex items-center gap-2 text-sm font-semibold text-[#8a7a68] transition hover:text-[#5c4f40]"
          aria-expanded={showTables}
        >
          Per-table QR codes (future feature)
          <ChevronDown
            size={16}
            className={`transition-transform ${showTables ? 'rotate-180' : ''}`}
          />
        </button>

        {showTables && (
          <>
            <div className="mt-3 flex justify-end">
              <button
                onClick={addTable}
                className="flex items-center gap-2 rounded-xl border border-[#e5ded2] bg-white px-4 py-2 text-sm font-semibold text-[#5c4f40] transition active:scale-95"
              >
                <Plus size={15} /> Add Table
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {tables.map((table) => (
                <div
                  key={table}
                  className="flex flex-col items-center rounded-2xl border border-[#e5ded2] bg-white p-4 shadow-sm"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-1 font-display text-lg font-semibold">
                      <Coffee size={15} className="text-[#6b4a36]" /> {table}
                    </span>
                    <button
                      onClick={() => removeTable(table)}
                      aria-label={`Remove ${table}`}
                      className="grid h-7 w-7 place-items-center rounded-full text-[#b6aa99] transition hover:bg-[#f1ece2] hover:text-[#c2452e]"
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                  <div className="my-3 rounded-xl border border-[#f0ece3] p-2">
                    <QRCodeSVG
                      id={`table-${table}`}
                      value={tableUrl(table)}
                      size={130}
                      level="M"
                      fgColor="#241a16"
                      bgColor="#ffffff"
                      includeMargin={false}
                    />
                  </div>
                  <div className="mt-2 flex w-full gap-2">
                    <button
                      onClick={() => download(`table-${table}`, `sinan-${table}-qr`)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#241a16] px-3 py-2 text-xs font-semibold text-white transition active:scale-95"
                    >
                      <Download size={13} />
                    </button>
                    <button
                      onClick={() => copy(tableUrl(table), table)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e5ded2] px-3 py-2 text-xs font-semibold text-[#5c4f40] transition active:scale-95"
                    >
                      <Copy size={13} /> {copied === table ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
