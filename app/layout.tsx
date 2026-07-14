import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-shippori",
  display: "swap",
});

export const metadata: Metadata = {
  title: "careergen.online | 日本の求人情報とキャリアガイド",
  description:
    "careergen.online で日本国内の求人情報、応募のコツ、給与相場をわかりやすく解説するキャリアメディアです。",
  icons: {
    icon: '/careergen-logo.svg',
    apple: '/careergen-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${noto.variable} ${shippori.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NRWVFJJC');`}
        </Script>

        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRWVFJJC" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
