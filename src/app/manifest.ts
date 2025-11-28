import { MetadataRoute } from 'next';

// 👇 ДОБАВЬ ВОТ ЭТУ СТРОЧКУ
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ketly',
    short_name: 'Ketly',
    description: 'AI Администратор для вашего бизнеса',
    start_url: '/',
    display: 'standalone',
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