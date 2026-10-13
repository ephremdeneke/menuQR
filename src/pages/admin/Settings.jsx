import { useState } from 'react'
import { KeyRound, RotateCcw, ShieldAlert, Check } from 'lucide-react'
import { useAuth } from '../../authStore'
import { useMenu } from '../../menuStore'

const inputCls =
  'w-full rounded-xl border border-[#e5ded2] bg-[#fbf9f4] px-3 py-2.5 text-sm text-[#241a16] placeholder:text-[#b6aa99] focus:border-[#b88a52] focus:outline-none focus:ring-1 focus:ring-[#b88a52]/30'

export default function Settings() {
  const { creds, setCredentials } = useAuth()
  const resetMenu = useMenu((s) => s.resetMenu)

  const [current, setCurrent] = useState('')
  const [username, setUsername] = useState(creds.username)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState(null)
  const [resetMsg, setResetMsg] = useState(false)

  const saveCreds = (e) => {
    e.preventDefault()
    if (current !== creds.password) {
      return setMsg({ type: 'error', text: 'Current password is incorrect.' })
    }
    if (!username.trim()) {
      return setMsg({ type: 'error', text: 'Username cannot be empty.' })
    }
    if (password && password.length < 6) {
      return setMsg({ type: 'error', text: 'New password must be at least 6 characters.' })
    }
    if (password !== confirm) {
      return setMsg({ type: 'error', text: 'New passwords do not match.' })
    }
    setCredentials(username.trim(), password || creds.password)
    setCurrent('')
    setPassword('')
    setConfirm('')
    setMsg({ type: 'ok', text: 'Credentials updated successfully.' })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Settings</h1>
      <p className="text-sm text-[#8a7a68]">Manage your admin access and menu data</p>

      {/* Account */}
      <form
        onSubmit={saveCreds}
        className="mt-6 rounded-2xl border border-[#e5ded2] bg-white p-5 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <KeyRound size={18} className="text-[#6b4a36]" />
          <h2 className="font-display text-xl font-semibold">Admin credentials</h2>
        </div>
        <p className="mt-1 text-sm text-[#8a7a68]">
          Change the username or password used to sign in.
        </p>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
              Current password *
            </span>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="Enter current password"
              className={inputCls}
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
              Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputCls}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
                New password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#8a7a68]">
                Confirm password
              </span>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={inputCls}
              />
            </label>
          </div>
        </div>

        {msg && (
          <p
            role="status"
            className={`mt-4 rounded-lg px-3 py-2 text-sm ${
              msg.type === 'ok'
                ? 'bg-[#83bf6f]/15 text-[#4d7a3d]'
                : 'bg-red-50 text-[#c2452e]'
            }`}
          >
            {msg.text}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 flex items-center gap-2 rounded-xl bg-[#241a16] px-5 py-2.5 text-sm font-semibold text-white transition active:scale-95"
        >
          <Check size={16} /> Save changes
        </button>
      </form>

      {/* Menu data */}
      <div className="mt-6 rounded-2xl border border-[#e5ded2] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <RotateCcw size={18} className="text-[#6b4a36]" />
          <h2 className="font-display text-xl font-semibold">Menu data</h2>
        </div>
        <p className="mt-1 text-sm text-[#8a7a68]">
          Restore the menu to its original items and prices. This removes every edit and new
          item you have added.
        </p>
        <button
          onClick={() => {
            resetMenu()
            setResetMsg(true)
            setTimeout(() => setResetMsg(false), 2000)
          }}
          className="mt-4 flex items-center gap-2 rounded-xl border border-[#e5ded2] px-5 py-2.5 text-sm font-semibold text-[#c2452e] transition hover:bg-red-50 active:scale-95"
        >
          {resetMsg ? <Check size={16} /> : <RotateCcw size={16} />}
          {resetMsg ? 'Menu reset' : 'Reset menu to defaults'}
        </button>
      </div>

      {/* Demo notice */}
      <div className="mt-6 flex items-start gap-2 rounded-2xl border border-[#e8d9b8] bg-[#fdf6e7] p-4 text-sm text-[#7a5b1e]">
        <ShieldAlert size={17} className="mt-0.5 shrink-0" />
        <p>
          This admin login is a front-end demo only. Credentials are stored in the browser and
          are not secure — replace it with real server-side authentication before going live.
        </p>
      </div>
    </div>
  )
}
