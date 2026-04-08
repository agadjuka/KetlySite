import type { Metadata } from "next";

import { VyonPrivacyPage } from "@/components/vyon/VyonPrivacyPage";
import { VYON_PRIVACY_RU } from "@/content/vyon-privacy";

export const metadata: Metadata = {
  title: "Политика конфиденциальности VYON | Ketly",
  description:
    "Политика обработки персональных данных сервиса виртуальной примерки VYON: данные, хранение, права и контакты.",
  alternates: {
    canonical: "/vyon-privacy-ru",
    languages: {
      en: "/vyon-privacy",
      ru: "/vyon-privacy-ru",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.ketly.app/vyon-privacy-ru",
    title: "Политика конфиденциальности VYON | Ketly",
    description:
      "Политика обработки персональных данных сервиса виртуальной примерки VYON: данные, хранение, права и контакты.",
    siteName: "Ketly",
    locale: "ru_RU",
    images: [
      {
        url: "https://www.ketly.app/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Ketly",
      },
    ],
  },
};

export default function VyonPrivacyRuPage() {
  return <VyonPrivacyPage locale="ru" doc={VYON_PRIVACY_RU} />;
}
