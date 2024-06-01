import { LatLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import useDisclosure from '../../hooks/useDisclosure'
import Modal from '../utils/modal/Modal'

interface IProps {
  location: { lat: number; lng: number }
  setLocation: (location: { lat: number; lng: number }) => void
  height: string
  width: string
  animation?: 'flyTo' | 'boxZoom'
  animationDuration?: number
  enableConfirmation?: boolean
  defaultView?: 'openStreet' | 'satellite' | 'google'
}

export const GetLatLng = ({
  height,
  width,
  location,
  setLocation,
  animation,
  animationDuration,
  enableConfirmation,
  defaultView,
}: IProps) => {
  const { BaseLayer } = LayersControl
  const [map, setMap]: any = useState()
  const { open, onOpen, onClose, confirm, onConfirm } = useDisclosure()
  const [permission, setPermission] = useState<boolean>(true)
  const [marker, setMarker] = useState<{
    lat: number
    lng: number
  }>({
    lat: 27.689107,
    lng: 85.337321,
  })
  const [tempMarker, setTempMarker] = useState<{
    lat: number | null
    lng: number | null
  }>({
    lat: null,
    lng: null,
  })

  useEffect(() => {
    if (typeof location.lat === 'number' && typeof location.lng === 'number') {
      setMarker({
        lat: location.lat,
        lng: location.lng,
      })
    } else {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        })
      } else {
        setPermission(false)
        console.log('Geolocation is not available')
      }
    }
  }, [location])

  map?.on('click', function (e: any) {
    const newMarker: LatLng = new LatLng(e?.latlng?.lat, e?.latlng?.lng)
    if (enableConfirmation) {
      setTempMarker({
        lat: newMarker?.lat,
        lng: newMarker?.lng,
      })
      onOpen()
    } else {
      setMarker({
        lat: newMarker?.lat,
        lng: newMarker?.lng,
      })
      setLocation({
        lat: newMarker?.lat,
        lng: newMarker?.lng,
      })
    }
  })

  useEffect(() => {
    if (confirm) {
      setMarker({
        lat: tempMarker?.lat,
        lng: tempMarker?.lng,
      })
      setLocation({
        lat: tempMarker.lat,
        lng: tempMarker.lng,
      })
      onConfirm(false)
    }
  }, [confirm])

  const RecenterAutomatically = ({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) => {
    const map = useMap()
    useEffect(() => {
      map.setView([lat, lng], zoom, {
        animate: true,
        duration: animationDuration ?? 2,
      })
      if (animation === 'boxZoom') {
        map.boxZoom.enable()
      } else if (animation === 'flyTo') {
        map.flyTo([lat, lng], 16, {
          animate: true,
          duration: animationDuration ?? 2,
        })
      } else {
        map.flyTo([lat, lng], 16, {
          animate: true,
          duration: animationDuration ?? 2,
        })
      }
    }, [lat, lng])
    return null
  }

  const miniMap = useMemo(
    () => (
      <MapContainer
        center={[marker?.lat, marker.lng]}
        scrollWheelZoom={true}
        style={{ width: width, overflowY: 'hidden', height: height }}
        zoom={12.5}
        dragging={true}
        doubleClickZoom={true}
        attributionControl={true}
        zoomControl={true}
        ref={setMap}
      >
        <LayersControl>
          <BaseLayer name='Open Street Map' checked={!defaultView ? true : defaultView === 'openStreet' ? true : false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={'https://{s}.tile.osm.org/{z}/{x}/{y}.png'}
              maxZoom={20}
              subdomains={['a', 'b', 'c']}
            />
          </BaseLayer>
          <BaseLayer name='Satellite View' checked={defaultView === 'satellite' ? true : false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'}
              maxZoom={20}
              subdomains={['mt1', 'mt2', 'mt3']}
            />
          </BaseLayer>
          <BaseLayer name='Google map' checked={defaultView === 'google' ? true : false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'}
              maxZoom={20}
              subdomains={['mt1', 'mt2', 'mt3']}
            />
          </BaseLayer>
        </LayersControl>

        <Marker key={'one'} position={[marker.lat, marker.lng]}>
          <Popup>
            <p>{`Lat : ` + marker.lat}</p>
            <p>{`Lng : ` + marker.lng}</p>
          </Popup>
        </Marker>
        <RecenterAutomatically lat={marker?.lat} lng={marker?.lng} zoom={map?.getZoom()} />
      </MapContainer>
    ),
    [location, marker]
  )

  return (
    <div className='map_container'>
      {permission ? null : <p className='map_error'>Please allow location permission on your browser</p>}
      {miniMap}
      <Modal open={open} onClose={onClose} title='Confirm Location' onConfirm={onConfirm} />
    </div>
  )
}
