import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Star } from 'lucide-react'
import { sellers } from '../data/mockData'

const typeColors = {
  gratis: { bg: '#DCFCE7', text: '#16A34A', label: 'Gratis' },
  venta: { bg: '#FFF3E0', text: '#E65100', label: 'Venta' },
  trueque: { bg: '#EFF6FF', text: '#1D4ED8', label: 'Trueque' },
}

export default function FoodCard({ listing }) {
  const navigate = useNavigate()
  const seller = sellers[listing.sellerId] ?? { name: 'Tú', avatar: '😎', rating: 5.0 }
  const badge = typeColors[listing.type]

  return (
    <button
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="text-left bg-white rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-transform"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Gradient image area */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 110, background: listing.gradient }}
      >
        <span style={{ fontSize: 48 }}>{listing.emoji}</span>
        {/* Type badge */}
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{ background: badge.bg, color: badge.text }}
        >
          {badge.label}
        </div>
        {/* Expires warning for < 60 min */}
        {listing.expiresMin < 60 && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock size={9} />
            {listing.expiresMin} min
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p className="text-xs font-semibold text-gray-900 leading-tight line-clamp-2 mb-1.5">
          {listing.title}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[11px]">{seller.avatar}</span>
            <span className="text-[10px] text-gray-500">{seller.name.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={9} fill="#FF6B35" color="#FF6B35" />
            <span className="text-[10px] text-gray-600 font-medium">{seller.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={9} color="#9CA3AF" />
          <span className="text-[10px] text-gray-400">{listing.distance} km</span>
          {listing.type === 'venta' && (
            <span className="ml-auto text-[11px] font-bold" style={{ color: '#FF6B35' }}>
              ${listing.price}
            </span>
          )}
          {listing.type === 'trueque' && (
            <span className="ml-auto text-[10px] text-blue-500 font-medium">🔄 Trueque</span>
          )}
          {listing.type === 'gratis' && (
            <span className="ml-auto text-[10px] text-green-600 font-bold">✓ Gratis</span>
          )}
        </div>
      </div>
    </button>
  )
}
