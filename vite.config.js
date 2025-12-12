import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // ESTA LÍNEA ES CLAVE para el despliegue estático:
  base: './', 
  plugins: [react()],
});