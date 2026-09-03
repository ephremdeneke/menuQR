import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Plus, Minus, Download, Copy, Coffee } from 'lucide-react'

const defaultTables = ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10']

// Full URL to the customer menu for a given table
function tableUrl(table) {
  const base = window.location.origin + window.location.pathname.replace(/\/admin.*/, '')
  return `${base}/sinan?table=${table}`
}

export default function QRCodes() {
  const [tables, setTables] = useState(defaultTables)
  const [baseUrl, setBaseUrl] = useState('')
  const [copied, setCopied] = useState(null)
  const [size, setSize] = useState(160)

  useEffect(() => {
    setBaseUrl(tableUrl(''))
  }, [])

  const addTable = () => {
    const nums = tables.map((t) => parseInt(t.replace(/\D/g, ''), 10) || 0)
    const next = (Math.max(0, ...nums) + 1).toString().padStart(2, '0')
    setTables((t) => [...t, `T${next}`])
  }

  const removeTable = (t) => setTables((ts) => ts.filter((x) => x !== t))

  const download = (table) => {
    const svg = document.getElementById(`qr-${table}`)
    if (!svg) return
    const outer = document.createElement('div')
    outer.innerHTML = svg.outerHTML
    const innerSvg = outer.querySelector('svg')
    // Add a white background + high-res width for crisp PNG export
    innerSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    innerSvg.setAttribute('width', '1024')
    innerSvg.setAttribute('height', '1024')
    const blob = new Blob([outer.innerHTML.replaceAll('\n', '')], {
      type: 'image/svg+xml;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sinan-${table}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copy = async (table) => {
    try {
      await navigator.clipboard.writeText(tableUrl(table))
      setCopied(table)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">QR Codes</h1>
          <p className="text-sm text-[#8a7a68]">
            Menu link for each table — print & place on the table
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
            <option value={160}>Medium</option>
            <option value={200}>Large</option>
          </select>
          <button
            onClick={addTable}
            className="flex items-center gap-2 rounded-xl bg-[#241a16] px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95"
          >
            <Plus size={16} /> Add Table
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#e5ded2] bg-white p-4 text-sm">
        <span className="font-semibold text-[#8a7a68]">Menu base URL:</span>{' '}
          <code className="break-all text-[#6b4a36]">
            {baseUrl ? `${baseUrl}/sinan?table=T05` : '…'}
          </code>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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

            <div
              className="my-3 rounded-xl p-2 transition-shadow hover:shadow-md"
              style={{ background: '#ffffff', border: '1px solid #f0ece3' }}
            >
              <QRCodeSVG
                id={`qr-${table}`}
                value={tableUrl(table)}
                size={size}
                level="M"
                fgColor="#241a16"
                bgColor="#ffffff"
                includeMargin={false}
              />
            </div>

            <code className="w-full truncate rounded-md bg-[#f5f2ec] px-2 py-1 text-center text-[10px] text-[#8a7a68]">
              {tableUrl(table)}
            </code>

            <div className="mt-3 flex w-full gap-2">
              <button
                onClick={() => download(table)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#241a16] px-3 py-2 text-xs font-semibold text-white transition active:scale-95"
              >
                <Download size={13} /> SVG
              </button>
              <button
                onClick={() => copy(table)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e5ded2] px-3 py-2 text-xs font-semibold text-[#5c4f40] transition active:scale-95"
              >
                <Copy size={13} /> {copied === table ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
