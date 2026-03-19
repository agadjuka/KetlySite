import type { Metadata } from "next";
import { VyonTryOnInstructionsScreen } from "@/components/vyon/try-on-instructions/VyonTryOnInstructionsScreen";

export const metadata: Metadata = {
  title: "Инструкции Virtual Try-On | VYON",
  description:
    "Статичные инструкции по фото для виртуальной примерки VYON: что загружать и как подготовиться.",
  alternates: {
    canonical: "/vyon/try-on-instructions",
  },
};

export default function TryOnInstructionsPage() {
  return <VyonTryOnInstructionsScreen />;
}

