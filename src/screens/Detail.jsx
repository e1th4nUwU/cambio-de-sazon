import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, Clock, Shield, Package, X, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { sellers, currentUser } from '../data/mockData'

const typeColors = {
  gratis: { bg: '#DCFCE7', text: '#16A34A', label: '🎁 Gratis' },
  venta: { bg: '#FFF3E0', text: '#E65100', label: '🏷️ Venta' },
  trueque: { bg: '#EFF6FF', text: '#1D4ED8', label: '🔄 Trueque' },
}

const deliveryOptions = [
  { id: 'pickup', label: '🚶 Paso a recogerlo', desc: 'Tú vas a donde está la oferta' },
  { id: 'midpoint', label: '📍 Nos encontramos', desc: 'Acordamos un punto intermedio' },
  { id: 'delivery', label: '🚗 Me lo llevan', desc: 'El vendedor te lo lleva (acuerden costo)' },
]

export default function Detail() {
  const { id } = useParams()
  const { listings } = useApp()
  const navigate = useNavigate()
  const listing = listings.find((l) => String(l.id) === id)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState('pickup')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <p className="text-4xl">😕</p>
        <p className="text-sm text-gray-500">Esta oferta ya no está disponible</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm font-semibold px-4 py-2 rounded-xl"
          style={{ background: '#FF6B35', color: 'white' }}
        >
          Ver otras ofertas
        </button>
      </div>
    )
  }

  const seller = listing.sellerId === 'me' ? currentUser : sellers[listing.sellerId]
  const badge = typeColors[listing.type]

  function handleSend() {
    setSent(true)
    setTimeout(() => {
      setModalOpen(false)
      setSent(false)
      navigate('/')
    }, 1800)
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '100%', background: '#FFFAF5' }}>
      {/* Hero */}
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ height: 220, background: listing.gradient }}>
        <span style={{ fontSize: 80 }}>{listing.emoji}</span>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowLeft size={18} color="#111" />
        </button>
        {/* Time badge */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
          <Clock size={11} />
          Caduca en {listing.expiresMin} min
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Type + title */}
        <div
          className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold mb-2"
          style={{ background: badge.bg, color: badge.text }}
        >
          {badge.label}
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">{listing.title}</h1>

        {/* Price */}
        {listing.type === 'venta' && (
          <p className="text-2xl font-bold mb-3" style={{ color: '#FF6B35' }}>
            ${listing.price} <span className="text-sm font-normal text-gray-400">MXN</span>
          </p>
        )}
        {listing.type === 'trueque' && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-3">
            <p className="text-xs text-blue-500 font-semibold mb-0.5">A cambio pide:</p>
            <p className="text-sm text-blue-800">{listing.trueque}</p>
          </div>
        )}
        {listing.type === 'gratis' && (
          <p className="text-2xl font-bold text-green-600 mb-3">¡Gratis! 🎉</p>
        )}

        {/* Seller card */}
        <div className="bg-white rounded-2xl p-3 mb-3 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Quién ofrece</p>
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
              style={{ background: '#F3F4F6' }}
            >
              {seller?.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <p className="text-sm font-bold text-gray-900">{seller?.name}</p>
                {seller?.verified && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <Check size={10} color="white" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={11}
                    fill={s <= Math.round(seller?.rating ?? 0) ? '#FF6B35' : '#E5E7EB'}
                    color={s <= Math.round(seller?.rating ?? 0) ? '#FF6B35' : '#E5E7EB'}
                  />
                ))}
                <span className="text-[11px] text-gray-500 ml-1">
                  {seller?.rating} · {seller?.reviews} reseñas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-2">
            <MapPin size={14} color="#FF6B35" />
            <div>
              <p className="text-[10px] text-gray-400">Ubicación</p>
              <p className="text-xs font-semibold text-gray-800">{listing.distance} km · {listing.location.split(',')[0]}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-2">
            <Package size={14} color="#FF6B35" />
            <div>
              <p className="text-[10px] text-gray-400">Cantidad</p>
              <p className="text-xs font-semibold text-gray-800">{listing.quantity}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-3 shadow-sm mb-3">
          <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Descripción</p>
          <p className="text-sm text-gray-700 leading-relaxed">{listing.description}</p>
        </div>

        {/* Reviews */}
        {listing.reviews?.length > 0 && (
          <div className="bg-white rounded-2xl p-3 shadow-sm mb-3">
            <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Reseñas</p>
            {listing.reviews.map((r, i) => (
              <div key={i} className={`${i > 0 ? 'border-t border-gray-50 pt-2 mt-2' : ''}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-semibold text-gray-800">{r.user}</p>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={9} fill={s <= r.rating ? '#FF6B35' : '#E5E7EB'} color={s <= r.rating ? '#FF6B35' : '#E5E7EB'} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Trust badge */}
        <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#F0FDF4' }}>
          <Shield size={14} color="#16A34A" />
          <p className="text-xs text-green-700">Perfil verificado · Sistema de rating mutuo</p>
        </div>
      </div>

      {/* CTA button - fixed bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FFFAF5] to-transparent" style={{ paddingBottom: 80 }}>
        <button
          onClick={() => setModalOpen(true)}
          className="w-full py-3.5 rounded-2xl text-white text-sm font-bold shadow-lg active:scale-95 transition-transform"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C69)' }}
        >
          ¡Lo quiero! 🙋
        </button>
      </div>

      {/* Contact modal */}
      {modalOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
        >
          <div className="w-full bg-white rounded-t-3xl p-5" style={{ maxHeight: '80%', overflowY: 'auto' }}>
            {sent ? (
              <div className="flex flex-col items-center py-8 gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: '#DCFCE7' }}
                >
                  <Check size={32} color="#16A34A" strokeWidth={3} />
                </div>
                <p className="text-lg font-bold text-gray-900">¡Solicitud enviada!</p>
                <p className="text-sm text-gray-500 text-center">
                  {seller?.name.split(' ')[0]} recibirá tu mensaje y se pondrán en contacto contigo.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-bold text-gray-900">¿Cómo lo coordinamos?</p>
                  <button onClick={() => setModalOpen(false)}>
                    <X size={20} color="#9CA3AF" />
                  </button>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  {deliveryOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedDelivery(opt.id)}
                      className="flex items-start gap-3 p-3 rounded-xl text-left transition-all"
                      style={
                        selectedDelivery === opt.id
                          ? { background: '#FFF3E0', border: '2px solid #FF6B35' }
                          : { background: '#F9FAFB', border: '2px solid transparent' }
                      }
                    >
                      <span className="text-base leading-none mt-0.5">{opt.label.split(' ')[0]}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{opt.label.split(' ').slice(1).join(' ')}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hola ${seller?.name.split(' ')[0]}, me interesa tu oferta...`}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 outline-none resize-none mb-4"
                  rows={3}
                />

                <button
                  onClick={handleSend}
                  className="w-full py-3.5 rounded-2xl text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C69)' }}
                >
                  Enviar solicitud 🚀
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
