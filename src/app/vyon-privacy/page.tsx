import type { Metadata } from "next";

import { VyonPrivacyPage } from "@/components/vyon/VyonPrivacyPage";
import { VYON_PRIVACY_EN } from "@/content/vyon-privacy";

export const metadata: Metadata = {
  title: "VYON Privacy Policy | Ketly",
  description:
    "Privacy Policy for the VYON virtual try-on service: personal data, storage, rights, and contact.",
  alternates: {
    canonical: "/vyon-privacy",
    languages: {
      en: "/vyon-privacy",
      ru: "/vyon-privacy-ru",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.ketly.app/vyon-privacy",
    title: "VYON Privacy Policy | Ketly",
    description:
      "Privacy Policy for the VYON virtual try-on service: personal data, storage, rights, and contact.",
    siteName: "Ketly",
    locale: "en_US",
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

export default function VyonPrivacyEnPage() {
  return <VyonPrivacyPage locale="en" doc={VYON_PRIVACY_EN} />;
}
