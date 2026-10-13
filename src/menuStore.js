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
      addCategory: (category) =>
        set((s) => ({ categories: [...s.categories, category] })),
      updateCategory: (id, patch) =>
        set((s) => ({
          categories: s.categories.map((c) =>
            c.id === id ? { ...c, ...patch, id: c.id } : c
          ),
        })),
      deleteCategory: (id) =>
        set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),
      // Move a category up/down. The "all" category always stays first.
      moveCategory: (id, dir) =>
        set((s) => {
          const cats = [...s.categories]
          const i = cats.findIndex((c) => c.id === id)
          if (i < 1) return s
          const j = dir === 'up' ? i - 1 : i + 1
          if (j < 1 || j >= cats.length) return s
          ;[cats[i], cats[j]] = [cats[j], cats[i]]
          return { categories: cats }
        }),
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
          products: s.products.map((p) => {
            if (p.id !== id) return p
            const soldOut = !p.soldOut
            return { ...p, soldOut, available: !soldOut }
          }),
        })),
      resetMenu: () => set({ products: seedProducts, categories }),
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

// Resolve a fresh slug id for new categories
export function makeCategoryId(name) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  let id = base || 'category'
  const existing = new Set(useMenu.getState().categories.map((c) => c.id))
  let i = 2
  while (existing.has(id)) {
    id = `${base}-${i}`
    i += 1
  }
  return id
}
