# REACTJS-MAP

A React component library providing dynamic map functionality with Leaflet

## Table of Contents

1. [Installation](#installation)
2. [Feature](#feature)
3. [Usage](#usage)
4. [Dynamic Control](#dynamic_control)
5. [License](#license)

## Installation

Open a terminal or command prompt and run:

Using npm:

```shell
$ npm i reactjs-map
```

Using yarn:

```shell
$ yarn add reactjs-map
```

Using pnpm:

```shell
$ pnpm add reactjs-map
```

> You should see the reactjs-map in your package.json

## Features

- Easy to Use
- Multiple Map Views
- Animation
- Dynamic Control
- Customizable
- Extensive Integration
- High Performance

### Usage

```js
import {GetLatLng} from 'reactjs-map';

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
```

### Dynamic Control

1. **Control for GetLatLng Component**

```js
interface IGetLatLong {
  location: { lat: number; lng: number }
  setLocation: (location: { lat: number; lng: number }) => void
  height: string
  width: string
  animation?: 'flyTo' | 'boxZoom'
  animationDuration?: number
  enableConfirmation?: boolean
  defaultView?: 'openStreet' | 'satellite' | 'google'
}
```

## License

[MIT](LICENSE)
