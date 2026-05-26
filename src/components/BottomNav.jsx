import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Map, Plus, User } from 'lucide-react'

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const tabs = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Map, label: 'Mapa', path: '/map' },
    { icon: null, label: 'Publicar', path: '/publish' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ]

  return (
    <div className="flex-shrink-0 bg-white border-t border-gray-100 flex items-center justify-around px-2 pb-2 pt-1" style={{ height: 72 }}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path || (tab.path === '/' && pathname === '')
        const isPublish = tab.path === '/publish'

        if (isPublish) {
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center -mt-6"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C69)' }}
              >
                <Plus size={28} color="white" strokeWidth={2.5} />
              </div>
            </button>
          )
        }

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
          >
            <tab.icon
              size={22}
              color={isActive ? '#FF6B35' : '#9CA3AF'}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? '#FF6B35' : '#9CA3AF' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
