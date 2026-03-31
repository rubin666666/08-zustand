import type { Metadata } from "next";

import { OG_IMAGE, getSiteUrl } from "@/lib/seo";

import css from "./not-found.module.css";

const notFoundUrl = getSiteUrl("/not-found");

export const metadata: Metadata = {
  title: "404 | NoteHub",
  description:
    "The requested NoteHub page does not exist. Please check the address and try again.",
  alternates: {
    canonical: notFoundUrl,
  },
  openGraph: {
    title: "404 | NoteHub",
    description:
      "The requested NoteHub page does not exist. Please check the address and try again.",
    url: notFoundUrl,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Open Graph image",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
