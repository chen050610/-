// vite.config.js
import { defineConfig } from "file:///D:/project/vue_project/node_modules/.pnpm/vite@5.1.3_sass@1.71.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/project/vue_project/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.3_vue@3.4.19/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import {
  createSvgIconsPlugin
} from "file:///D:/project/vue_project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.1.3/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\project\\vue_project";
var pathResolve = (dir) => resolve(__vite_injected_original_dirname, dir);
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      symbolId: "icon-[dir]-[name]"
    })
  ],
  pluginOptions: {
    "style-resources-loader": {
      preprocessor: "scss",
      patterns: []
    }
  },
  //配置启动的端口号，还有师傅允许跨域
  server: {
    port: 8080,
    cors: true,
    //允许跨域
    open: false
    //我就不自动打开浏览器了
  },
  resolve: {
    alias: {
      "@": pathResolve("./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHZ1ZV9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHZ1ZV9wcm9qZWN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3Z1ZV9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQge1xuICBjcmVhdGVTdmdJY29uc1BsdWdpblxufSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5cbmNvbnN0IHBhdGhSZXNvbHZlID0gZGlyID0+IHJlc29sdmUoX19kaXJuYW1lLGRpcilcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZnJyldLFxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgfSldLFxuICBwbHVnaW5PcHRpb25zOntcbiAgICAnc3R5bGUtcmVzb3VyY2VzLWxvYWRlcic6e1xuICAgICAgcHJlcHJvY2Vzc29yOidzY3NzJyxcbiAgICAgIHBhdHRlcm5zOltdXG4gICAgfVxuICB9LFxuICAvL1x1OTE0RFx1N0Y2RVx1NTQyRlx1NTJBOFx1NzY4NFx1N0FFRlx1NTNFM1x1NTNGN1x1RkYwQ1x1OEZEOFx1NjcwOVx1NUUwOFx1NTA4NVx1NTE0MVx1OEJCOFx1OERFOFx1NTdERlxuICBzZXJ2ZXI6e1xuICAgIHBvcnQ6ODA4MCxcbiAgICBjb3JzOnRydWUsLy9cdTUxNDFcdThCQjhcdThERThcdTU3REZcbiAgICBvcGVuOmZhbHNlLy9cdTYyMTFcdTVDMzFcdTRFMERcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcdTRFODZcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOntcbiAgICAgICdAJzpwYXRoUmVzb2x2ZSgnLi9zcmMnKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFAsU0FBUyxvQkFBb0I7QUFDdlIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QjtBQUFBLEVBQ0U7QUFBQSxPQUNLO0FBTFAsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxjQUFjLFNBQU8sUUFBUSxrQ0FBVSxHQUFHO0FBR2hELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUFDLElBQUk7QUFBQSxJQUNaLHFCQUFxQjtBQUFBLE1BQ25CLFVBQVUsQ0FBQyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsTUFDbkQsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQUM7QUFBQSxFQUNKLGVBQWM7QUFBQSxJQUNaLDBCQUF5QjtBQUFBLE1BQ3ZCLGNBQWE7QUFBQSxNQUNiLFVBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFFBQU87QUFBQSxJQUNMLE1BQUs7QUFBQSxJQUNMLE1BQUs7QUFBQTtBQUFBLElBQ0wsTUFBSztBQUFBO0FBQUEsRUFDUDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTTtBQUFBLE1BQ0osS0FBSSxZQUFZLE9BQU87QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
