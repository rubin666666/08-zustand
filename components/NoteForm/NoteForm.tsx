"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createNote, notesKeys } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import {
  initialDraft,
  type CreateNotePayload,
  type NoteTag,
} from "@/types/note";

import css from "./NoteForm.module.css";

const noteTags: NoteTag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

function isNoteTag(value: string): value is NoteTag {
  return noteTags.includes(value as NoteTag);
}

function normalizeDraft(formData: FormData): CreateNotePayload {
  const tagValue = String(formData.get("tag") ?? initialDraft.tag);

  return {
    title: String(formData.get("title") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    tag: isNoteTag(tagValue) ? tagValue : initialDraft.tag,
  };
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const createNoteMutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: async () => {
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: notesKeys.all });
      router.back();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const values = normalizeDraft(formData);

    if (!values.title) {
      return;
    }

    try {
      await createNoteMutation.mutateAsync(values);
    } catch {
      // The mutation state already stores the error for rendering.
    }
  };

  return (
    <form className={css.form}>
      <label className={css.formGroup}>
        <span className={css.label}>Title</span>
        <input
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(event) => setDraft({ title: event.target.value })}
          required
        />
      </label>

      <label className={css.formGroup}>
        <span className={css.label}>Content</span>
        <textarea
          name="content"
          className={css.textarea}
          value={draft.content}
          onChange={(event) => setDraft({ content: event.target.value })}
        />
      </label>

      <label className={css.formGroup}>
        <span className={css.label}>Tag</span>
        <select
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(event) => {
            if (isNoteTag(event.target.value)) {
              setDraft({ tag: event.target.value });
            }
          }}
        >
          {noteTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      {createNoteMutation.isError && (
        <p className={css.error}>
          Failed to save the note: {createNoteMutation.error.message}
        </p>
      )}

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          formAction={handleSubmit}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? "Saving..." : "Save note"}
        </button>
      </div>
    </form>
  );
}
