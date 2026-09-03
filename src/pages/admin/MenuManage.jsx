import { useState } from 'react'
import { Plus, Search, Pencil, Trash2, Star, ImageOff, X } from 'lucide-react'
import { useMenu, makeId } from '../../menuStore'
import { formatETB } from '../../data/menu'

const text = (field) =>
  field !== undefined && field !== null && String(field).trim() !== '' && String(field).trim().toLowerCase() !== 'undefined'

const priceStyles = { available: 'bg-[#83bf6f]/15 text-[#4d7a3d]', soldout: 'bg-[#e5ded2] text-[#8a7a68]' }

export default function MenuManage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, toggleAvailable } =
    useMenu()
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState(null) // product being edited, or {new:true}
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Menu</h1>
          <p className="text-sm text-[#8a7a68]">
            {products.length} items · changes reflect instantly on the customer menu
          </p>
        </div>
        <button
          onClick={() => setEditing({ new: true })}
          className="flex items-center gap-2 rounded-xl bg-[#241a16] px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#e5ded2] bg-white px-3 py-2.5 sm:w-80">
        <Search size={16} className="text-[#8a7a68]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or category"
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-[#e5ded2] bg-white shadow-sm">
            <div className="relative h-32">
              {p.image ? (
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#efe9dd] text-[#b6aa99]">
                  <ImageOff size={22} />
                </div>
              )}
              <button
                onClick={() => setEditing(p)}
                aria-label={`Edit ${p.name}`}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70 active:scale-90"
              >
                <Pencil size={14} />
              </button>
              <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white">
                <Star size={11} className="fill-[#f3c94b] text-[#f3c94b]" /> {formatETB(p.price)}
              </div>
              {p.category && (
                <span className="absolute bottom-2 left-2 rounded-md bg-black/45 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                  {p.category}
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-display text-lg font-semibold leading-tight">{p.name}</p>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    aria-label={`Delete ${p.name}`}
                    className="grid h-7 w-7 place-items-center rounded-md text-[#b6aa99] transition hover:bg-red-50 hover:text-[#c2452e]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <p className="truncate text-xs text-[#8a7a68]">
                {p.description ? p.description : 'No description'}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => toggleAvailable(p.id)}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition active:scale-95 ${
                    p.soldOut ? priceStyles.soldout : priceStyles.available
                  }`}
                  title="Toggle availability"
                >
                  {p.soldOut ? 'Sold Out' : 'Available'}
                </button>
                {p.featured && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b88a52]">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-[#e5ded2] py-16 text-center text-[#8a7a68]">
            No items found. Try a different search.
          </div>
        )}
      </div>

      {editing && (
        <ProductForm
          product={editing.new ? null : editing}
          categories={categories.filter((c) => c.id !== 'all')}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            if (editing.new) {
              addProduct({ ...data, id: makeId(data.name), featured: !!data.featured })
            } else {
              updateProduct(editing.id, data)
            }
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}

function ProductForm({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    amharic: product?.amharic || '',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    category: product?.category || categories[0]?.id || 'coffee',
    soldOut: product?.soldOut || false,
    featured: product?.featured || false,
    badge: product?.badge || '',
  })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      name: form.name.trim() || 'Untitled',
      price: Number(form.price) || 0,
      amharic: text(form.amharic) ? form.amharic : undefined,
      description: text(form.description) ? form.description : '',
      image: text(form.image) ? form.image : '',
      badge: text(form.badge) ? form.badge : undefined,
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 pt-10 lg:items-center" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSave}
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl lg:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-[#e5ded2] px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            {product ? 'Edit Item' : 'Add Item'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#e5ded2] text-[#5c4f40]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {/* Layout preview */}
          {form.image && (
            <div className="h-36 overflow-hidden rounded-xl bg-black/5">
              <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
          <Field label="Name *">
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Ethiopian Honey Latte"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Amharic name">
            <input
              value={form.amharic}
              onChange={(e) => set('amharic', e.target.value)}
              placeholder="e.g. የኢትዮጵያ ቡና"
              className={`${inputCls} font-ethiopic`}
            />
          </Field>
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Short editorial description…"
              rows={3}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price (ETB) *">
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="120"
                className={inputCls}
                required
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className={inputCls}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Image URL">
            <input
              value={form.image}
              onChange={(e) => set('image', e.target.value)}
              placeholder="https://… or leave blank"
              className={inputCls}
            />
          </Field>
          <Field label="Badge (optional)">
            <input
              value={form.badge}
              onChange={(e) => set('badge', e.target.value)}
              placeholder="Origin / Signature / House Favourite"
              className={inputCls}
            />
          </Field>

          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm font-medium text-[#5c4f40]">
              <input
                type="checkbox"
                checked={form.soldOut}
                onChange={(e) => set('soldOut', e.target.checked)}
                className="h-4 w-4 accent-[#241a16]"
              />
              Sold Out
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-[#5c4f40]">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="h-4 w-4 accent-[#241a16]"
              />
              Featured (Today at Sinan)
            </label>
          </div>
        </div>

        <div className="flex gap-3 border-t border-[#e5ded2] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#e5ded2] py-3 text-sm font-semibold text-[#5c4f40]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#241a16] py-3 text-sm font-semibold text-white transition active:scale-95"
          >
            {product ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-[#e5ded2] bg-[#fbf9f4] px-3 py-2.5 text-sm text-[#241a16] placeholder:text-[#b6aa99] focus:border-[#b88a52] focus:outline-none focus:ring-1 focus:ring-[#b88a52]/30'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
        {label}
      </span>
      {children}
    </label>
  )
}
