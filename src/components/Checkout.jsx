import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart, useApp, useCheckout } from '../store'
import { formatETB, cafeInfo } from '../data/menu'
import BottomSheet from './BottomSheet'
import OrderSuccess from './OrderSuccess'

const sampleTables = ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10']

export default function Checkout() {
  const items = useCart((s) => s.items)
  const updateQty = useCart((s) => s.updateQty)
  const setNote = useCart((s) => s.setNote)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)
  const subtotal = useCart((s) => s.subtotal(s))

  const table = useApp((s) => s.table)
  const setTable = useApp((s) => s.setTable)

  const { open, setOpen, step, setStep, orderNo, setOrderNo } = useCheckout()

  const [localTable, setLocalTable] = useState(table || '')
  const [placing, setPlacing] = useState(false)

  useEffect(() => {
    if (open) {
      setLocalTable(table || '')
      if (step === 'success') {
        // clear cart after success
        if (items.length > 0) clear()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const placeOrder = () => {
    setPlacing(true)
    // Simulate network call
    setTimeout(() => {
      const no = `SIN-${Math.floor(1000 + Math.random() * 9000)}`
      setLocalTable(localTable || table)
      setOrderNo(no)
      if (localTable) setTable(localTable)
      setStep('success')
      setPlacing(false)
    }, 1400)
  }

  return (
    <>
      {/* Step 1 + 2: order & confirm */}
      <BottomSheet
        open={open && step !== 'success'}
        onClose={() => setOpen(false)}
        title={step === 'order' ? 'Your Order' : 'Confirm'}
        maxWidth="max-w-xl"
      >
        {/* Order list */}
        <ul className="divide-y divide-[var(--line)]">
          {items.map((item, i) => (
            <li key={`${item.product.id}-${i}`} className="flex items-center gap-3 py-3">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg font-semibold text-[var(--ink)]">
                  {item.product.name}
                </p>
                {item.note && (
                  <p className="truncate font-sans text-xs italic text-[var(--accent)]">
                    “{item.note}”
                  </p>
                )}
                <input
                  value={item.note}
                  onChange={(e) => setNote(i, e.target.value)}
                  placeholder="Note (optional)"
                  aria-label={`Note for ${item.product.name}`}
                  className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1.5 font-sans text-xs text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
                <p className="mt-0.5 font-sans text-xs text-[var(--muted)]">
                  {formatETB(item.product.price)} each
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-[var(--line)] p-0.5">
                <button
                  aria-label="Decrease"
                  onClick={() => updateQty(i, item.qty - 1)}
                  className="grid h-7 w-7 place-items-center rounded-full text-[var(--ink)] active:scale-90"
                >
                  <Minus size={13} />
                </button>
                <span className="w-6 text-center font-sans text-sm font-semibold text-[var(--ink)]">
                  {item.qty}
                </span>
                <button
                  aria-label="Increase"
                  onClick={() => updateQty(i, item.qty + 1)}
                  className="grid h-7 w-7 place-items-center rounded-full text-[var(--ink)] active:scale-90"
                >
                  <Plus size={13} />
                </button>
              </div>
              <span className="w-16 text-right font-sans text-sm font-semibold text-[var(--ink)]">
                {formatETB(item.product.price * item.qty)}
              </span>
              <button
                aria-label={`Remove ${item.product.name}`}
                onClick={() => remove(i)}
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--muted)] hover:text-red-500 active:scale-90"
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>

        {/* Table selection */}
        <div className="mt-5">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
            Your table
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sampleTables.map((t) => (
              <button
                key={t}
                onClick={() => setLocalTable(t)}
                className={`rounded-full border px-4 py-2 font-sans text-xs font-semibold transition-all active:scale-95 ${
                  localTable === t
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]'
                    : 'border-[var(--line)] text-[var(--muted)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {!localTable && (
            <p className="mt-2 font-sans text-xs text-[var(--muted)]">
              {table ? `Table ${table} from QR` : 'Select your table to continue'}
            </p>
          )}
        </div>

        {/* Totals */}
        <div className="mt-5 rounded-xl bg-[var(--surface-2)] p-4">
          <div className="flex items-center justify-between font-sans text-sm text-[var(--muted)]">
            <span>Subtotal</span>
            <span>{formatETB(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[var(--line)] pt-2 font-sans text-base font-semibold text-[var(--ink)]">
            <span>Total</span>
            <span>{formatETB(subtotal)}</span>
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={placeOrder}
            disabled={items.length === 0 || !localTable || placing}
            className="btn-primary w-full !py-4 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {placing ? 'Placing order…' : `Place Order · ${formatETB(subtotal)}`}
          </button>
          <p className="mt-3 text-center font-sans text-xs text-[var(--muted)]">
            {localTable
              ? `Table ${localTable} · ${cafeInfo.address}`
              : 'Your order will be sent to the bar'}
          </p>
        </div>
      </BottomSheet>

      {/* Success screen */}
      <OrderSuccess open={open && step === 'success'} orderNo={orderNo} table={localTable || table} onClose={() => setOpen(false)} />
    </>
  )
}
