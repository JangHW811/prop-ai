import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { Providers } from "@/app/providers";

import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://propai.kr"),
  title: "프롭파이 PropAI | 웹·앱 개발 전문회사, 아이디어를 현실로 구현합니다",
  description:
    "프롭파이는 웹·앱 개발 전문 회사입니다. 기획서가 없어도 상담 가능하며, NDA 기반 비밀보장으로 아이디어를 안전하게 검토하고 실제 서비스로 구현합니다.",
  keywords: [
    "웹개발",
    "앱개발",
    "웹앱개발",
    "모바일앱개발",
    "NDA",
    "비밀보장",
    "아이디어구현",
    "전주웹개발",
    "전주앱개발",
    "프롭파이",
    "PropAI",
  ],
  authors: [{ name: "(주)프롭파이 PropAI Inc." }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://propai.kr/",
    siteName: "프롭파이 PropAI",
    title: "프롭파이 PropAI | 웹·앱 개발 전문회사, 아이디어를 현실로 구현합니다",
    description:
      "기획서가 없어도 괜찮습니다. NDA 기반 비밀보장으로 아이디어를 안전하게 검토하고, 웹·앱 서비스로 현실화하는 개발 파트너 프롭파이.",
  },
  twitter: {
    card: "summary_large_image",
    title: "프롭파이 PropAI | 웹·앱 개발 전문회사, 아이디어를 현실로 구현합니다",
    description:
      "NDA 기반 비밀보장, 웹·앱 개발 전문성, 기획부터 런칭까지 함께하는 IT 파트너 프롭파이.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
