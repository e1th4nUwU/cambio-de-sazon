import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Check, Leaf, Heart, Settings, ChevronRight, Bell, Shield, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'
import FoodCard from '../components/FoodCard'

export default function Profile() {
  const { currentUser, listings } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ofertas')

  const myListings = listings.filter((l) => l.sellerId === 'me')

  const historial = [
    { emoji: '🌮', title: 'Tacos de canasta ×8', date: 'hace 3 días', type: 'compra', with: 'María G.' },
    { emoji: '🥐', title: 'Pan dulce surtido', date: 'hace 1 semana', type: 'recibido', with: 'Panadería El Sol' },
    { emoji: '🍉', title: 'Fruta picada', date: 'hace 2 semanas', type: 'donación', with: 'Comunidad' },
  ]

  const settings = [
    { icon: Bell, label: 'Notificaciones', desc: 'Radio de alerta: 2 km' },
    { icon: Shield, label: 'Privacidad', desc: 'Perfil verificado ✓' },
    { icon: Settings, label: 'Configuración', desc: 'Idioma, tema, cuenta' },
  ]

  return (
    <div className="flex flex-col" style={{ background: '#FFFAF5', minHeight: '100%' }}>
      {/* Header gradient */}
      <div
        className="px-4 pt-5 pb-16 relative"
        style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C69 100%)' }}
      >
        <p className="text-white font-bold text-base mb-4">Mi perfil</p>
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: 'rgba(255,255,255,0.25)' }}
          >
            {currentUser.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-white text-lg font-bold">{currentUser.name}</p>
              {currentUser.verified && (
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                  <Check size={11} color="white" strokeWidth={3} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  fill={s <= Math.round(currentUser.rating) ? 'white' : 'rgba(255,255,255,0.3)'}
                  color={s <= Math.round(currentUser.rating) ? 'white' : 'rgba(255,255,255,0.3)'}
                />
              ))}
              <span className="text-white/80 text-xs ml-1">{currentUser.rating} · {currentUser.reviews} reseñas</span>
            </div>
            <p className="text-white/60 text-xs mt-0.5">Desde {currentUser.since}</p>
          </div>
        </div>
      </div>

      {/* Stats card - overlaps header */}
      <div className="mx-4 -mt-10 mb-4 bg-white rounded-2xl shadow-md p-4 relative z-10">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-xl mb-1">🌱</div>
            <p className="text-base font-bold text-gray-900">{currentUser.savedKg} kg</p>
            <p className="text-[10px] text-gray-400">Comida salvada</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-xl mb-1">🤝</div>
            <p className="text-base font-bold text-gray-900">{currentUser.transactions}</p>
            <p className="text-[10px] text-gray-400">Transacciones</p>
          </div>
          <div className="text-center">
            <div className="text-xl mb-1">⭐</div>
            <p className="text-base font-bold text-gray-900">{currentUser.rating}</p>
            <p className="text-[10px] text-gray-400">Rating</p>
          </div>
        </div>
      </div>

      {/* Impact banner */}
      <div
        className="mx-4 mb-4 rounded-xl p-3 flex items-center gap-3"
        style={{ background: '#F0FDF4' }}
      >
        <Leaf size={18} color="#16A34A" />
        <div>
          <p className="text-xs font-bold text-green-800">Tu impacto ambiental</p>
          <p className="text-[11px] text-green-600">Evitaste ~{(currentUser.savedKg * 2.5).toFixed(1)} kg de CO₂ · ¡Gracias!</p>
        </div>
        <Heart size={14} color="#16A34A" className="ml-auto" />
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mb-3 bg-gray-100 rounded-xl p-1">
        {['ofertas', 'historial'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
            style={
              activeTab === tab
                ? { background: 'white', color: '#FF6B35', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }
                : { color: '#9CA3AF' }
            }
          >
            {tab === 'ofertas' ? 'Mis ofertas' : 'Historial'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 pb-6">
        {activeTab === 'ofertas' && (
          <>
            {myListings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-2">📭</p>
                <p className="text-sm font-medium text-gray-700">Aún no has publicado nada</p>
                <button
                  onClick={() => navigate('/publish')}
                  className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: '#FF6B35' }}
                >
                  Publicar mi primera oferta
                </button>
              </div>
            ) : (
              <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {myListings.map((l) => (
                  <FoodCard key={l.id} listing={l} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'historial' && (
          <div className="flex flex-col gap-2">
            {historial.map((h, i) => (
              <div key={i} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: '#FFF3E0' }}
                >
                  {h.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{h.title}</p>
                  <p className="text-[11px] text-gray-400">Con {h.with} · {h.date}</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={
                    h.type === 'donación'
                      ? { background: '#DCFCE7', color: '#16A34A' }
                      : h.type === 'compra'
                      ? { background: '#FFF3E0', color: '#E65100' }
                      : { background: '#EFF6FF', color: '#1D4ED8' }
                  }
                >
                  {h.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="px-4 pb-24">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Configuración</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {settings.map((s, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ borderBottom: i < settings.length - 1 ? '1px solid #F3F4F6' : 'none' }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: '#FFF3E0' }}
              >
                <s.icon size={15} color="#FF6B35" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{s.label}</p>
                <p className="text-[11px] text-gray-400">{s.desc}</p>
              </div>
              <ChevronRight size={16} color="#D1D5DB" />
            </button>
          ))}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 py-3 mt-3 rounded-xl text-sm font-semibold text-red-400"
          style={{ background: '#FEF2F2' }}
        >
          <LogOut size={15} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
