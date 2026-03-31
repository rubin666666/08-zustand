import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { getNoteById, noteByIdQueryOptions } from "@/lib/api";
import { createQueryClient } from "@/lib/query-client";
import { createSeoMetadata } from "@/lib/seo";
import type { Note } from "@/types/note";

import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) {
    return createSeoMetadata({
      title: "Note not found | NoteHub",
      description:
        "The requested note could not be found in NoteHub. Open the notes list to continue browsing.",
      path: `/notes/${id}`,
    });
  }

  return createSeoMetadata({
    title: `${note.title} | NoteHub`,
    description: note.content || `Open the ${note.tag.toLowerCase()} note in NoteHub.`,
    path: `/notes/${id}`,
  });
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(noteByIdQueryOptions(id));
  const note = queryClient.getQueryData<Note | null>(
    noteByIdQueryOptions(id).queryKey,
  );

  if (!note) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
