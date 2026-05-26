import { createContext, useContext, useState } from 'react'
import { listings as initial, currentUser } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [listings, setListings] = useState(initial)
  const [notifications, setNotifications] = useState(3)

  function addListing(listing) {
    const newListing = {
      ...listing,
      id: Date.now(),
      sellerId: 'me',
      postedAt: 'ahora mismo',
      expiresMin: listing.expiresMin ?? 120,
      reviews: [],
      distance: 0.1,
      location: 'Tu ubicación, CDMX',
    }
    setListings((prev) => [newListing, ...prev])
  }

  function clearNotifications() {
    setNotifications(0)
  }

  return (
    <AppContext.Provider value={{ listings, currentUser, addListing, notifications, clearNotifications }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
