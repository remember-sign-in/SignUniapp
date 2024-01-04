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
    extensions: ['.js', '.jsx', '.ts', '.tsx',]
  },
  //小程序端无效
  // server:{
  //   port:51030,
  //   proxy:{
  //     "/api":{
  //       target:"http://127.0.0.1:4523/m1/3686108-0-default/",
  //       changeOrigin:true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     }
  //   }    
  // }
})
