import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ReactJSMap',
      fileName: (format) => `reactjs-map.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'leaflet', 'react-leaflet'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          leaflet: 'L',
          'react-leaflet': 'ReactLeaflet',
        },
      },
    },
  },
})
