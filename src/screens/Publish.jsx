import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { categories } from '../data/mockData'

const foodEmojis = ['🌮', '🥐', '🍲', '🫔', '🥗', '🍉', '🍕', '🥘', '🍱', '🥙', '🍛', '🎂', '🥞', '🌽', '🥑']

const gradients = {
  '🌮': 'linear-gradient(135deg, #f97316, #ef4444)',
  '🥐': 'linear-gradient(135deg, #fbbf24, #f97316)',
  '🍲': 'linear-gradient(135deg, #4ade80, #16a34a)',
  '🫔': 'linear-gradient(135deg, #a78bfa, #7c3aed)',
  '🥗': 'linear-gradient(135deg, #34d399, #0891b2)',
  '🍉': 'linear-gradient(135deg, #f472b6, #ef4444)',
  '🍕': 'linear-gradient(135deg, #fbbf24, #ef4444)',
  '🥘': 'linear-gradient(135deg, #f97316, #b45309)',
  '🍱': 'linear-gradient(135deg, #6ee7b7, #3b82f6)',
  '🥙': 'linear-gradient(135deg, #fde68a, #f97316)',
  '🍛': 'linear-gradient(135deg, #fbbf24, #a16207)',
  '🎂': 'linear-gradient(135deg, #f9a8d4, #ec4899)',
  '🥞': 'linear-gradient(135deg, #fde68a, #d97706)',
  '🌽': 'linear-gradient(135deg, #fde047, #f97316)',
  '🥑': 'linear-gradient(135deg, #86efac, #16a34a)',
}

const timeOptions = [
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
  { label: '2 horas', value: 120 },
  { label: '4 horas', value: 240 },
  { label: 'Todo el día', value: 480 },
]

export default function Publish() {
  const navigate = useNavigate()
  const { addListing } = useApp()

  const [selectedEmoji, setSelectedEmoji] = useState('🌮')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Antojitos')
  const [type, setType] = useState('gratis')
  const [price, setPrice] = useState('')
  const [trueque, setTrueque] = useState('')
  const [description, setDescription] = useState('')
  const [expiresMin, setExpiresMin] = useState(120)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!title.trim()) return
    addListing({
      title,
      description,
      type,
      price: type === 'venta' ? Number(price) : null,
      trueque: type === 'trueque' ? trueque : null,
      emoji: selectedEmoji,
      gradient: gradients[selectedEmoji] ?? 'linear-gradient(135deg, #FF6B35, #FF8C69)',
      category,
      expiresMin,
      quantity: '1 porción',
    })
    setSubmitted(true)
    setTimeout(() => navigate('/'), 1800)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4" style={{ background: '#FFFAF5' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C69)' }}
        >
          <Check size={40} color="white" strokeWidth={3} />
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-1">¡Oferta publicada!</p>
          <p className="text-sm text-gray-500">Tu {title} ya está disponible</p>
        </div>
        <p className="text-2xl">{selectedEmoji}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col" style={{ background: '#FFFAF5', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 bg-white shadow-sm">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} color="#374151" />
        </button>
        <p className="text-base font-bold text-gray-900">Nueva oferta</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
        {/* Photo / emoji picker */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="w-full rounded-2xl flex flex-col items-center justify-center mb-4 relative overflow-hidden"
          style={{ height: 160, background: gradients[selectedEmoji] ?? '#FF6B35' }}
        >
          <span style={{ fontSize: 64 }}>{selectedEmoji}</span>
          <div className="absolute bottom-3 right-3 bg-white/90 rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
            <Camera size={12} color="#FF6B35" />
            <span className="text-[11px] font-semibold text-gray-700">Elige icono</span>
          </div>
        </button>

        {/* Emoji picker */}
        {showEmojiPicker && (
          <div className="bg-white rounded-2xl p-3 mb-4 shadow-sm">
            <div className="flex flex-wrap gap-2 justify-center">
              {foodEmojis.map((e) => (
                <button
                  key={e}
                  onClick={() => { setSelectedEmoji(e); setShowEmojiPicker(false) }}
                  className="text-2xl w-10 h-10 rounded-xl flex items-center justify-center"
                  style={e === selectedEmoji ? { background: '#FFF3E0', border: '2px solid #FF6B35' } : { background: '#F9FAFB' }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category */}
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Categoría</p>
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4" style={{ scrollbarWidth: 'none' }}>
          {categories.slice(1).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={
                category === c
                  ? { background: '#FF6B35', color: 'white' }
                  : { background: '#F3F4F6', color: '#6B7280' }
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Title */}
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">¿Qué ofreces?</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Tacos de canasta ×10"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none mb-4"
          style={{ '::placeholder': { color: '#9CA3AF' } }}
        />

        {/* Type */}
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tipo de oferta</p>
        <div className="flex gap-2 mb-4">
          {[
            { id: 'gratis', label: '🎁 Gratis', color: '#16A34A', bg: '#DCFCE7' },
            { id: 'venta', label: '🏷️ Venta', color: '#E65100', bg: '#FFF3E0' },
            { id: 'trueque', label: '🔄 Trueque', color: '#1D4ED8', bg: '#EFF6FF' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={
                type === t.id
                  ? { background: t.bg, color: t.color, border: `2px solid ${t.color}` }
                  : { background: '#F9FAFB', color: '#9CA3AF', border: '2px solid transparent' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Price or Trueque */}
        {type === 'venta' && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Precio (MXN)</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-8 text-sm text-gray-900 outline-none"
              />
            </div>
          </div>
        )}

        {type === 'trueque' && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">¿Qué pides a cambio?</p>
            <input
              value={trueque}
              onChange={(e) => setTrueque(e.target.value)}
              placeholder="Ej: Fruta, pan, algo de la tienda..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Descripción</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cuéntale a la gente de qué se trata, cómo está preparado, qué cantidad hay..."
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none resize-none mb-4"
          rows={3}
        />

        {/* Time available */}
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Disponible por</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {timeOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => setExpiresMin(t.value)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={
                expiresMin === t.value
                  ? { background: '#1C1917', color: 'white' }
                  : { background: '#F3F4F6', color: '#6B7280' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100" style={{ paddingBottom: 88 }}>
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full py-3.5 rounded-2xl text-white text-sm font-bold transition-all"
          style={{
            background: title.trim()
              ? 'linear-gradient(135deg, #FF6B35, #FF8C69)'
              : '#E5E7EB',
            color: title.trim() ? 'white' : '#9CA3AF',
          }}
        >
          Publicar oferta 🌱
        </button>
      </div>
    </div>
  )
}
