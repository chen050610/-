import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import {
  createSvgIconsPlugin
} from 'vite-plugin-svg-icons'

const pathResolve = dir => resolve(__dirname,dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    })],
  pluginOptions:{
    'style-resources-loader':{
      preprocessor:'scss',
      patterns:[]
    }
  },
  //配置启动的端口号，还有师傅允许跨域
  server:{
    port:8080,
    cors:true,//允许跨域
    open:false//我就不自动打开浏览器了
  },
  resolve: {
    alias:{
      '@':pathResolve('./src')
    }
  }
})
