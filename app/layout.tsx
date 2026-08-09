import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yiping-huang-ai-product.huangyiping312.chatgpt.site"),
  title: "黄奕平 — AI Product Manager",
  description:
    "黄奕平的个人作品集：AI 产品、搜索质量、增长实验，以及把模糊问题变成可上线产品的过程。",
  keywords: ["黄奕平", "AI 产品经理", "AI Product Manager", "搜索产品", "作品集"],
  authors: [{ name: "黄奕平" }],
  openGraph: {
    title: "黄奕平 — AI Product Manager",
    description: "I turn ambiguous AI problems into products that ship.",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "AI Products That Ship" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "黄奕平 — AI Product Manager",
    description: "I turn ambiguous AI problems into products that ship.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/profile.png",
    shortcut: "/profile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={geistSans.variable + " " + geistMono.variable}>
        {children}
      </body>
    </html>
  );
}
