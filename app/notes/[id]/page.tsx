import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { getNoteById, noteByIdQueryOptions } from "@/lib/api";
import { createQueryClient } from "@/lib/query-client";
import { OG_IMAGE, getSiteUrl } from "@/lib/seo";
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
  const url = getSiteUrl(`/notes/${id}`);

  if (!note) {
    return {
      title: "Note not found | NoteHub",
      description:
        "The requested note could not be found in NoteHub. Open the notes list to continue browsing.",
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: "Note not found | NoteHub",
        description:
          "The requested note could not be found in NoteHub. Open the notes list to continue browsing.",
        url,
        images: [
          {
            url: OG_IMAGE,
            width: 1200,
            height: 630,
            alt: "Note not found Open Graph image",
          },
        ],
      },
    };
  }

  return {
    title: `${note.title} | NoteHub`,
    description: note.content || `Open the ${note.tag.toLowerCase()} note in NoteHub.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${note.title} | NoteHub`,
      description:
        note.content || `Open the ${note.tag.toLowerCase()} note in NoteHub.`,
      url,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${note.title} Open Graph image`,
        },
      ],
    },
  };
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
