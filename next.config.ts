import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Разрешаем cross-origin запросы к /_next/* ресурсам с ngrok и локальной сети.
  // Без этого при доступе через ngrok браузер не получает CSS/JS и страница выглядит несвёрстанной.
  allowedDevOrigins: [
    "*.ngrok.io",
    "*.ngrok-free.app",
    "*.ngrok.dev",
    "192.168.*",
    "10.*",
  ],
};

export default nextConfig;
