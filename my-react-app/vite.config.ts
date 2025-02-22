import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Haxophone/', // Replace 'Haxophone' with your repository name
  plugins: [react()],
});
