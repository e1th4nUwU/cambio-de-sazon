import { useState } from 'react'
import { Search, Bell, SlidersHorizontal, Leaf } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FoodCard from '../components/FoodCard'
import { useApp } from '../context/AppContext'
import { categories, typeFilters } from '../data/mockData'

export default function Home() {
  const { listings, notifications, clearNotifications } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('Todo')
  const [activeCategory, setActiveCategory] = useState('Todo')

  const filtered = listings.filter((l) => {
    const matchType =
      activeType === 'Todo' ||
      l.type === activeType.toLowerCase()
    const matchCat =
      activeCategory === 'Todo' || l.category === activeCategory
    const matchSearch =
      !search || l.title.toLowerCase().includes(search.toLowerCase())
    return matchType && matchCat && matchSearch
  })

  const gratisCount = listings.filter((l) => l.type === 'gratis').length

  return (
    <div className="flex flex-col" style={{ background: '#FFFAF5', minHeight: '100%' }}>
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C69)' }}
            >
              <Leaf size={16} color="white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 leading-none">Bienvenido 👋</p>
              <p className="text-sm font-bold text-gray-900 leading-tight">Cambio de Sazón</p>
            </div>
          </div>
          <button
            className="relative w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm"
            onClick={() => { clearNotifications(); navigate('/profile') }}
          >
            <Bell size={18} color="#374151" />
            {notifications > 0 && (
              <div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] text-white font-bold"
                style={{ background: '#FF6B35' }}
              >
                {notifications}
              </div>
            )}
          </button>
        </div>

        {/* Stats pill */}
        <div
          className="flex items-center justify-between px-3 py-2 rounded-xl mb-3"
          style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C69 100%)' }}
        >
          <div className="text-white">
            <p className="text-[10px] opacity-80">Ofertas cerca de ti</p>
            <p className="text-sm font-bold">{listings.length} disponibles · 2.5 km</p>
          </div>
          <div className="text-right text-white">
            <p className="text-[10px] opacity-80">Gratis hoy</p>
            <p className="text-sm font-bold">{gratisCount} 🎁</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 shadow-sm mb-3">
          <Search size={15} color="#9CA3AF" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar comida cerca..."
            className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 text-xs">✕</button>
          )}
        </div>

        {/* Type filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                activeType === t
                  ? { background: '#FF6B35', color: 'white' }
                  : { background: 'white', color: '#6B7280', border: '1px solid #E5E7EB' }
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className="flex-shrink-0 px-3 py-1 rounded-lg text-[11px] font-medium transition-all"
            style={
              activeCategory === c
                ? { background: '#1C1917', color: 'white' }
                : { background: '#F3F4F6', color: '#6B7280' }
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between px-4 mb-2">
        <p className="text-xs text-gray-500">
          {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
        </p>
        <button className="flex items-center gap-1 text-xs text-gray-500">
          <SlidersHorizontal size={11} />
          Más cercano
        </button>
      </div>

      {/* Grid */}
      <div className="px-4 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">🥺</p>
            <p className="text-sm font-medium text-gray-700">No hay ofertas aquí</p>
            <p className="text-xs text-gray-400 mt-1">Sé el primero en publicar algo</p>
          </div>
        ) : (
          <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {filtered.map((l) => (
              <FoodCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
