import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Layers,
} from 'lucide-react'
import { useMenu, makeCategoryId } from '../../menuStore'

const inputCls =
  'w-full rounded-xl border border-[#e5ded2] bg-[#fbf9f4] px-3 py-2 text-sm text-[#241a16] placeholder:text-[#b6aa99] focus:border-[#b88a52] focus:outline-none focus:ring-1 focus:ring-[#b88a52]/30'

export default function Categories() {
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    moveCategory,
  } = useMenu()

  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ name: '', amharic: '' })
  const [adding, setAdding] = useState(false)
  const [newCat, setNewCat] = useState({ name: '', amharic: '' })
  const [error, setError] = useState('')

  const allCat = categories.find((c) => c.id === 'all')
  const realCats = categories.filter((c) => c.id !== 'all')

  const countFor = (id) => products.filter((p) => p.category === id).length

  const startEdit = (c) => {
    setError('')
    setEditingId(c.id)
    setDraft({ name: c.name, amharic: c.amharic || '' })
  }

  const saveEdit = () => {
    if (!draft.name.trim()) return
    updateCategory(editingId, {
      name: draft.name.trim(),
      amharic: draft.amharic.trim() || undefined,
    })
    setEditingId(null)
  }

  const submitNew = (e) => {
    e.preventDefault()
    const name = newCat.name.trim()
    if (!name) return
    addCategory({
      id: makeCategoryId(name),
      name,
      amharic: newCat.amharic.trim() || undefined,
    })
    setNewCat({ name: '', amharic: '' })
    setAdding(false)
  }

  const tryDelete = (c) => {
    const n = countFor(c.id)
    if (n > 0) {
      setError(
        `“${c.name}” still has ${n} item${n > 1 ? 's' : ''}. Move them to another category first.`
      )
      return
    }
    setError('')
    deleteCategory(c.id)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Categories</h1>
          <p className="text-sm text-[#8a7a68]">
            Group the menu — this drives the customer's filter bar
          </p>
        </div>
        <button
          onClick={() => {
            setError('')
            setAdding(true)
          }}
          className="flex items-center gap-2 rounded-xl bg-[#241a16] px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-[#c2452e]">
          {error}
        </p>
      )}

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#e5ded2] bg-white shadow-sm">
        {/* "All" is system-fixed and always first */}
        <div className="flex items-center justify-between gap-2 border-b border-[#f0ece3] px-4 py-3">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#b6aa99]" />
            <span className="font-medium">{allCat?.name || 'All'}</span>
            {allCat?.amharic && (
              <span className="font-ethiopic text-xs text-[#8a7a68]">{allCat.amharic}</span>
            )}
            <span className="rounded-full bg-[#efe9dd] px-2 py-0.5 text-[11px] text-[#8a7a68]">
              All items
            </span>
          </div>
          <span className="text-xs text-[#b6aa99]">Fixed</span>
        </div>

        {realCats.map((c, idx) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-2 border-b border-[#f0ece3] px-4 py-3 last:border-0"
          >
            {editingId === c.id ? (
              <div className="flex flex-1 items-center gap-2">
                <input
                  autoFocus
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                  className={inputCls}
                  aria-label="Category name"
                />
                <input
                  value={draft.amharic}
                  onChange={(e) => setDraft((d) => ({ ...d, amharic: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                  placeholder="አማርኛ"
                  className={`${inputCls} font-ethiopic`}
                  aria-label="Category Amharic name"
                />
                <button
                  onClick={saveEdit}
                  aria-label="Save category"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#241a16] text-white transition active:scale-95"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  aria-label="Cancel"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#e5ded2] text-[#5c4f40]"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-medium">{c.name}</span>
                  {c.amharic && (
                    <span className="shrink-0 font-ethiopic text-xs text-[#8a7a68]">
                      {c.amharic}
                    </span>
                  )}
                  <span className="shrink-0 rounded-full bg-[#efe9dd] px-2 py-0.5 text-[11px] text-[#8a7a68]">
                    {countFor(c.id)} items
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => moveCategory(c.id, 'up')}
                    disabled={idx === 0}
                    aria-label={`Move ${c.name} up`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-[#8a7a68] transition hover:bg-[#efe9dd] disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    onClick={() => moveCategory(c.id, 'down')}
                    disabled={idx === realCats.length - 1}
                    aria-label={`Move ${c.name} down`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-[#8a7a68] transition hover:bg-[#efe9dd] disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    onClick={() => startEdit(c)}
                    aria-label={`Rename ${c.name}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-[#8a7a68] transition hover:bg-[#efe9dd]"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => tryDelete(c)}
                    aria-label={`Delete ${c.name}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-[#b6aa99] transition hover:bg-red-50 hover:text-[#c2452e]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {realCats.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-[#8a7a68]">
            No categories yet — add one to get started.
          </p>
        )}
      </div>

      {adding && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 pt-10 lg:items-center"
          onClick={() => setAdding(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitNew}
            className="w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl lg:rounded-3xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Add Category</h2>
              <button
                type="button"
                onClick={() => setAdding(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#e5ded2] text-[#5c4f40]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
                  Name *
                </span>
                <input
                  autoFocus
                  value={newCat.name}
                  onChange={(e) => setNewCat((c) => ({ ...c, name: e.target.value }))}
                  placeholder="e.g. Juice"
                  className={inputCls}
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
                  Amharic name
                </span>
                <input
                  value={newCat.amharic}
                  onChange={(e) => setNewCat((c) => ({ ...c, amharic: e.target.value }))}
                  placeholder="e.g. ጁስ"
                  className={`${inputCls} font-ethiopic`}
                />
              </label>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="flex-1 rounded-xl border border-[#e5ded2] py-3 text-sm font-semibold text-[#5c4f40]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#241a16] py-3 text-sm font-semibold text-white transition active:scale-95"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
