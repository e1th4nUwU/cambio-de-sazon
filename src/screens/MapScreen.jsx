import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Locate, ZoomIn, ZoomOut } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { mapPins } from '../data/mockData'

const typeColors = {
  gratis: '#16A34A',
  venta: '#FF6B35',
  trueque: '#1D4ED8',
}

export default function MapScreen() {
  const { listings } = useApp()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const selectedListing = listings.find((l) => l.id === selected)

  return (
    <div className="flex flex-col" style={{ minHeight: '100%', background: '#FFFAF5' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <p className="text-base font-bold text-gray-900">Mapa de ofertas</p>
        <p className="text-xs text-gray-400">{listings.length} disponibles cerca de ti</p>
      </div>

      {/* Fake map */}
      <div className="mx-4 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-sm" style={{ height: 320 }}>
        {/* Map background - grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: '#e8f0e8',
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(rgba(180,200,180,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180,200,180,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 200px 200px, 200px 200px',
          }}
        />

        {/* Streets simulation */}
        <div className="absolute inset-0">
          {/* Horizontal streets */}
          <div className="absolute bg-white/70" style={{ left: 0, right: 0, top: '35%', height: 10, borderTop: '1px solid #d1d5db', borderBottom: '1px solid #d1d5db' }} />
          <div className="absolute bg-white/70" style={{ left: 0, right: 0, top: '70%', height: 6, borderTop: '1px solid #d1d5db' }} />
          {/* Vertical streets */}
          <div className="absolute bg-white/70" style={{ top: 0, bottom: 0, left: '40%', width: 12, borderLeft: '1px solid #d1d5db', borderRight: '1px solid #d1d5db' }} />
          <div className="absolute bg-white/70" style={{ top: 0, bottom: 0, left: '72%', width: 8, borderLeft: '1px solid #d1d5db' }} />
        </div>

        {/* Radius circle */}
        <div
          className="absolute rounded-full border-2 border-dashed"
          style={{
            width: 200,
            height: 200,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderColor: '#FF6B35',
            background: 'rgba(255, 107, 53, 0.05)',
          }}
        />

        {/* User location */}
        <div
          className="absolute z-20"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="w-5 h-5 rounded-full border-2 border-white shadow-md"
            style={{ background: '#3B82F6' }}
          />
          <div
            className="absolute w-10 h-10 rounded-full -top-2.5 -left-2.5 animate-ping"
            style={{ background: 'rgba(59, 130, 246, 0.2)' }}
          />
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap font-semibold">
            Tú
          </div>
        </div>

        {/* Food pins */}
        {mapPins.map((pin) => {
          const listing = listings.find((l) => l.id === pin.id)
          if (!listing) return null
          const isSelected = selected === pin.id
          return (
            <button
              key={pin.id}
              onClick={() => setSelected(isSelected ? null : pin.id)}
              className="absolute z-10 flex flex-col items-center"
              style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div
                className="flex items-center justify-center rounded-full border-2 border-white shadow-md transition-all"
                style={{
                  width: isSelected ? 44 : 36,
                  height: isSelected ? 44 : 36,
                  background: isSelected ? listing.gradient : 'white',
                  fontSize: isSelected ? 22 : 18,
                }}
              >
                {pin.emoji}
              </div>
              {isSelected && (
                <div
                  className="mt-1 bg-gray-900 text-white text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap font-semibold"
                >
                  {listing.distance} km
                </div>
              )}
            </button>
          )
        })}

        {/* Map controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
            <ZoomIn size={14} color="#374151" />
          </button>
          <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
            <ZoomOut size={14} color="#374151" />
          </button>
          <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center">
            <Locate size={14} color="#FF6B35" />
          </button>
        </div>
      </div>

      {/* Selected listing card */}
      {selectedListing && (
        <div className="mx-4 mt-3">
          <button
            onClick={() => navigate(`/listing/${selectedListing.id}`)}
            className="w-full bg-white rounded-2xl shadow-md p-3 flex items-center gap-3 text-left"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: selectedListing.gradient }}
            >
              <span style={{ fontSize: 28 }}>{selectedListing.emoji}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{selectedListing.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{selectedListing.location.split(',')[0]} · {selectedListing.distance} km</p>
              <p className="text-xs mt-1 font-semibold" style={{ color: '#FF6B35' }}>
                Ver oferta →
              </p>
            </div>
            <div>
              {selectedListing.type === 'gratis' && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Gratis</span>
              )}
              {selectedListing.type === 'venta' && (
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">${selectedListing.price}</span>
              )}
              {selectedListing.type === 'trueque' && (
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">Trueque</span>
              )}
            </div>
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="mx-4 mt-3 bg-white rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-around">
          {[
            { color: '#16A34A', label: 'Gratis' },
            { color: '#FF6B35', label: 'Venta' },
            { color: '#1D4ED8', label: 'Trueque' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
              <span className="text-xs text-gray-600">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
