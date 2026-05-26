import { Routes, Route } from 'react-router-dom'
import BottomNav from './BottomNav'
import Home from '../screens/Home'
import Detail from '../screens/Detail'
import Publish from '../screens/Publish'
import Profile from '../screens/Profile'
import MapScreen from '../screens/MapScreen'

export default function PhoneFrame() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', padding: '32px 16px' }}
    >
      {/* Phone shell */}
      <div
        className="relative flex-shrink-0"
        style={{ width: 390, height: 844 }}
      >
        {/* Outer bezel */}
        <div
          className="absolute inset-0 rounded-[3.2rem] bg-gray-900"
          style={{
            boxShadow:
              '0 0 0 2px #374151, 0 50px 100px rgba(0,0,0,0.7), 0 25px 50px rgba(0,0,0,0.5)',
          }}
        />

        {/* Side buttons - volume */}
        <div className="absolute bg-gray-700 rounded-l-sm" style={{ left: -3, top: 130, width: 3, height: 56 }} />
        <div className="absolute bg-gray-700 rounded-l-sm" style={{ left: -3, top: 200, width: 3, height: 40 }} />
        <div className="absolute bg-gray-700 rounded-l-sm" style={{ left: -3, top: 254, width: 3, height: 40 }} />
        {/* Power button */}
        <div className="absolute bg-gray-700 rounded-r-sm" style={{ right: -3, top: 180, width: 3, height: 70 }} />

        {/* Screen area */}
        <div
          className="absolute overflow-hidden flex flex-col"
          style={{
            inset: 4,
            borderRadius: '2.9rem',
            background: '#FFFAF5',
          }}
        >
          {/* Dynamic island */}
          <div
            className="absolute left-1/2 bg-black rounded-full z-50 pointer-events-none"
            style={{ top: 14, transform: 'translateX(-50%)', width: 108, height: 32 }}
          />

          {/* Status bar */}
          <div
            className="flex-shrink-0 flex justify-between items-center z-40"
            style={{ height: 52, paddingLeft: 28, paddingRight: 20, paddingTop: 12 }}
          >
            <span className="text-[13px] font-bold text-gray-900">9:41</span>
            <div className="flex items-center gap-2">
              {/* Signal bars */}
              <div className="flex items-end gap-px" style={{ height: 11 }}>
                {[4, 6, 8, 11].map((h, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 rounded-sm"
                    style={{ width: 3, height: h }}
                  />
                ))}
              </div>
              {/* WiFi icon */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path d="M7.5 9L8.8 7.7 7.5 6.4 6.2 7.7 7.5 9z" fill="#111827" />
                <path d="M4.5 7C5.4 6.1 6.4 5.6 7.5 5.6S9.6 6.1 10.5 7" stroke="#111827" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                <path d="M1.5 4.5C3.2 2.8 5.2 2 7.5 2s4.3.8 6 2.5" stroke="#111827" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-px">
                <div
                  className="relative border border-gray-800 rounded-sm"
                  style={{ width: 23, height: 12 }}
                >
                  <div
                    className="absolute bg-gray-900 rounded-sm"
                    style={{ inset: 1.5, right: 2 }}
                  />
                </div>
                <div className="bg-gray-700 rounded-r-sm" style={{ width: 2, height: 6 }} />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col" style={{ background: '#FFFAF5' }}>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listing/:id" element={<Detail />} />
                <Route path="/publish" element={<Publish />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/map" element={<MapScreen />} />
              </Routes>
            </div>
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  )
}
