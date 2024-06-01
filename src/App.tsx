import { useState } from 'react'
import { GetLatLng } from './components/getLatLng'

const App = () => {
  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  })

  return (
    <GetLatLng
      location={location}
      setLocation={setLocation}
      height='100vh'
      width='100vw'
      animation='flyTo'
      animationDuration={2}
      enableConfirmation={true}
      defaultView='google'
    />
  )
}

export default App
