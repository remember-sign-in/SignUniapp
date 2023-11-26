import { defineConfig } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  plugins: [
    uni(),
  ],
  resolve: {
    alias: ('@',path.resolve(__dirname, './src')),
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})
