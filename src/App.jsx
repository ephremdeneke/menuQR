import React, { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useApp } from './store'
import Loader from './components/Loader'

const MenuExperience = lazy(() => import('./pages/MenuExperience'))
const Admin = lazy(() => import('./pages/admin/Admin'))

export default function App() {
  const { theme } = useApp()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/menu/:tableId?" element={<MenuExperience />} />
        <Route path="/sinan" element={<MenuExperience />} />
        <Route path="*" element={<MenuExperience />} />
      </Routes>
    </Suspense>
  )
}
