import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ketly AI',
    short_name: 'Ketly',
    description: 'AI Администратор для вашего бизнеса',
    start_url: '/',
    display: 'standalone', // <--- ВОТ ЭТО УБИРАЕТ ИНТЕРФЕЙС БРАУЗЕРА
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}