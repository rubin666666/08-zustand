import type { Metadata } from "next";

import NoteForm from "@/components/NoteForm/NoteForm";
import { OG_IMAGE, getSiteUrl } from "@/lib/seo";

import css from "./page.module.css";

const createNoteUrl = getSiteUrl("/notes/action/create");

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description:
    "Create a new note in NoteHub and keep your draft safe while you are still editing.",
  alternates: {
    canonical: createNoteUrl,
  },
  openGraph: {
    title: "Create note | NoteHub",
    description:
      "Create a new note in NoteHub and keep your draft safe while you are still editing.",
    url: createNoteUrl,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Create note page Open Graph image",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
