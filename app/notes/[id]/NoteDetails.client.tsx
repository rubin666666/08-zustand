"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound } from "next/navigation";

import { noteByIdQueryOptions } from "@/lib/api";

import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  noteId: string;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...noteByIdQueryOptions(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={css.content}>Loading note...</p>;
  }

  if (isError) {
    return <p className={css.content}>Failed to load note: {error.message}</p>;
  }

  if (!note) {
    notFound();
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <article className={css.item}>
          <Link href="/notes/filter/all" className={css.backBtn}>
            Back to notes
          </Link>

          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </header>

          <p className={css.content}>{note.content || "No content"}</p>
          <p className={css.date}>Created: {formatDate(note.createdAt)}</p>
        </article>
      </div>
    </main>
  );
}
