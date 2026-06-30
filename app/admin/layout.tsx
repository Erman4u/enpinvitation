'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const navs = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Themes', path: '/admin/themes' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Invitations', path: '/admin/invitations' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Admin CMS</h1>
          <p className="text-sm text-gray-400">EnP Digital</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navs.map(nav => {
            const isActive = pathname === nav.path
            return (
              <Link 
                key={nav.path} 
                href={nav.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {nav.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white">
            ← Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {navs.find(n => n.path === pathname)?.name || 'Admin'}
          </h2>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
