import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Разрешаем cross-origin запросы к /_next/* ресурсам с ngrok и локальной сети.
  // Без этого при доступе через ngrok браузер не получает CSS/JS и страница выглядит несвёрстанной.
  // Разрешаем загрузку /_next/* ресурсов при доступе через ngrok.
  // Wildcards для всех поддоменов ngrok (включая ngrok-free.dev с дефисом).
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.dev",
    "*.ngrok.app",
  ],
};

export default nextConfig;
