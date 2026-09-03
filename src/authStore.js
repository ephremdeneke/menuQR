import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Admin authentication (mock backend).
// Credentials can be changed here or via Settings.
const DEFAULT_USER = 'admin'
const DEFAULT_PASS = 'sinan123'

export const useAuth = create(
  persist(
    (set, get) => ({
      user: null, // { username }
      error: null,
      // Persisted credentials so admin can change password in Settings
      creds: { username: DEFAULT_USER, password: DEFAULT_PASS },
      login: (username, password) => {
        const { creds } = get()
        if (username === creds.username && password === creds.password) {
          set({ user: { username }, error: null })
          return true
        }
        set({ error: 'Invalid username or password' })
        return false
      },
      logout: () => set({ user: null, error: null }),
      setCredentials: (username, password) =>
        set((s) => ({
          creds: {
            username: username || s.creds.username,
            password: password || s.creds.password,
          },
        })),
      isAuthed: () => !!get().user,
    }),
    { name: 'sinan-admin-auth' }
  )
)
