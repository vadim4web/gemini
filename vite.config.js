import { defineConfig, loadEnv  } from "vite";
import react from '@vitejs/plugin-react'
// import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // eslint-disable-next-line no-undef
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const isProduction = mode === 'production' || command === 'build'
  const base = isProduction ? '/gemini/' : '/'

  console.log(base)

  return {
    plugins: [
      react(),
    ],
    // resolve: {
    //   alias: {
    //     '@': path.resolve(__dirname, 'src'),
    //     '~': path.resolve(__dirname, 'src'),
    //   },
    // },
    base, // встановлюємо base URL для GitHub Pages
  }
});
