import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";

const root = process.cwd();
console.log("root", root);
const pathResolve = (pathname) => resolve(root, ".", pathname);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  plugins: [vue()],
});
