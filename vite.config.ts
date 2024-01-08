import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "movie-maker"),

  // ビルド設定
  build: {
    // 出力先ディレクトリを指定
    outDir: path.resolve(__dirname, "docs"),

    // TypeScript と JavaScript のファイル解決
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "movie-maker/index.html"),
      },
    },
  },
});
