import { create } from 'zustand'

// Cart store with quantity tracking
export const useCart = create((set, get) => ({
  items: [], // { product, qty, note }
  lastAdded: null,
  add: (product, qty = 1, note = '') => {
    const { items } = get()
    const existing = items.find(
      (i) => i.product.id === product.id && i.note === note
    )
    let newItems
    if (existing) {
      newItems = items.map((i) =>
        i.product.id === product.id && i.note === note
          ? { ...i, qty: i.qty + qty }
          : i
      )
    } else {
      newItems = [...items, { product, qty, note }]
    }
    set({ items: newItems, lastAdded: { id: product.id, at: Date.now() } })
  },
  updateQty: (index, qty) => {
    const { items } = get()
    if (qty <= 0) {
      set({ items: items.filter((_, i) => i !== index) })
    } else {
      set({
        items: items.map((i, idx) => (idx === index ? { ...i, qty } : i)),
      })
    }
  },
  setNote: (index, note) => {
    const { items } = get()
    set({
      items: items.map((i, idx) => (idx === index ? { ...i, note } : i)),
    })
  },
  remove: (index) => {
    const { items } = get()
    set({ items: items.filter((_, i) => i !== index) })
  },
  clear: () => set({ items: [], lastAdded: null }),
  subtotal: (state) =>
    state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
  count: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
}))

// Table + theme + search UI state
export const useApp = create((set) => ({
  table: null, // from URL ?table=T05
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  setTable: (table) => set({ table }),
}))

// The table can hold a "table picker open" flag for the checkout flow
export const useCheckout = create((set) => ({
  open: false,
  step: 'order', // order | confirm | success
  orderNo: '',
  setOpen: (open) => set({ open }),
  setStep: (step) => set({ step }),
  setOrderNo: (orderNo) => set({ orderNo }),
}))
