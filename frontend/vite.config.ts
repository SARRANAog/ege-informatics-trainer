import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Единственный активный Vite-конфиг проекта.
 * package.json всегда запускает Vite явно через `--config vite.config.ts`.
 * Не создавайте новые параллельные точки входа для frontend-конфига.
 */
export default defineConfig({
    plugins: [react()],
    server: {
        host: "127.0.0.1",
        port: 5173
    }
});