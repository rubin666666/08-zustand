"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import { noteByIdQueryOptions } from "@/lib/api";

import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  noteId: string;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();
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
    return (
      <Modal onClose={() => router.back()}>
        <p className={css.content}>Loading note...</p>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={() => router.back()}>
        <p className={css.content}>Failed to load note: {error.message}</p>
      </Modal>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <article className={css.item}>
          <button className={css.backBtn} onClick={() => router.back()}>
            Close
          </button>

          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </header>

          <p className={css.content}>{note.content || "No content"}</p>
          <p className={css.date}>Created: {formatDate(note.createdAt)}</p>
        </article>
      </div>
    </Modal>
  );
}
