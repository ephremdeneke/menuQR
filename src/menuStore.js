import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { products as seedProducts, categories } from './data/menu'

// Editable, persisted menu store.
// The customer menu + admin both read/write here so edits survive reloads.
export const useMenu = create(
  persist(
    (set, get) => ({
      products: seedProducts,
      categories,
      addProduct: (product) =>
        set((s) => ({ products: [product, ...s.products] })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, ...patch, id: p.id } : p
          ),
        })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      toggleAvailable: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id
              ? {
                  ...p,
                  available: !p.available,
                  soldOut: p.available ? true : p.soldOut,
                }
              : p
          ),
        })),
      resetMenu: () => set({ products: seedProducts }),
    }),
    { name: 'sinan-menu-storage' }
  )
)

// Resolve a fresh id (slug) for new products
export function makeId(name) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  let id = base || 'item'
  const existing = new Set(useMenu.getState().products.map((p) => p.id))
  let i = 2
  while (existing.has(id)) {
    id = `${base}-${i}`
    i += 1
  }
  return id
}
