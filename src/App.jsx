import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import PhoneFrame from './components/PhoneFrame'

export default function App() {
  return (
    <BrowserRouter basename="/cambio-de-sazon">
      <AppProvider>
        <PhoneFrame />
      </AppProvider>
    </BrowserRouter>
  )
}
