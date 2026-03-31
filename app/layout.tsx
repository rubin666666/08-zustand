import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import {
  APP_DESCRIPTION,
  APP_NAME,
  OG_IMAGE,
  getMetadataBase,
  getSiteUrl,
} from "@/lib/seo";

import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: APP_NAME,
  description: APP_DESCRIPTION,
  alternates: {
    canonical: getSiteUrl("/"),
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: getSiteUrl("/"),
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} Open Graph image`,
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
