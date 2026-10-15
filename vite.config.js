import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

// Emits /menu.json (the menu data as committed) and /site-info.json (which commit was built)
// into the build output, so a deploy can be checked for exactly what it serves.
function verificationArtifacts() {
  return {
    name: 'baan-siam-verification-artifacts',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'menu.json',
        source: readFileSync(new URL('./src/data/menu.json', import.meta.url), 'utf8'),
      })
      const siteInfo = {
        commitSha: process.env.VERCEL_GIT_COMMIT_SHA || null,
        branch: process.env.VERCEL_GIT_COMMIT_REF || null,
        builtAt: new Date().toISOString(),
      }
      this.emitFile({
        type: 'asset',
        fileName: 'site-info.json',
        source: `${JSON.stringify(siteInfo, null, 2)}\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    verificationArtifacts(),
  ],
})
