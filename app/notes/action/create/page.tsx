import type { Metadata } from "next";

import NoteForm from "@/components/NoteForm/NoteForm";
import { createSeoMetadata } from "@/lib/seo";

import css from "./page.module.css";

export const metadata: Metadata = createSeoMetadata({
  title: "Create note | NoteHub",
  description:
    "Create a new note in NoteHub and keep your draft safe while you are still editing.",
  path: "/notes/action/create",
});

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
