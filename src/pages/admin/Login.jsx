import { useState } from 'react'
import { Lock, User, LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../authStore'

export default function Login({ onSuccess }) {
  const { login, error } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setBusy(true)
    setTimeout(() => {
      const ok = login(username.trim(), password)
      setBusy(false)
      if (ok && onSuccess) onSuccess()
    }, 500)
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#f5f2ec] px-4 font-sans text-[#241a16]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#241a16] font-display text-3xl font-bold text-white">
            S
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold">Sinan Admin</h1>
          <p className="mt-1 text-sm text-[#8a7a68]">Sign in to manage your cafe</p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl border border-[#e5ded2] bg-white p-6 shadow-sm"
        >
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
              Username
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-[#e5ded2] bg-[#fbf9f4] px-3 focus-within:border-[#b88a52]">
              <User size={16} className="text-[#8a7a68]" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full bg-transparent py-2.5 text-sm focus:outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
              Password
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-[#e5ded2] bg-[#fbf9f4] px-3 focus-within:border-[#b88a52]">
              <Lock size={16} className="text-[#8a7a68]" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-transparent py-2.5 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                className="text-[#8a7a68]"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-[#c2452e]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#241a16] py-3 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-60"
          >
            <LogIn size={16} /> {busy ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-xs text-[#b6aa99]">
            Default: <code>admin</code> / <code>sinan123</code>
          </p>
        </form>
      </div>
    </div>
  )
}
