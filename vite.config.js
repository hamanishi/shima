import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  // 環境変数からベースパスを取得（デフォルトは /）
  const base = process.env.VITE_BASE_PATH || '/'

  return {
    base,

    server: {
      fs: {
        allow: ['..']
      }
    },

    // ビルド設定
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production' // 開発モードではソースマップを生成
    }
  }
})