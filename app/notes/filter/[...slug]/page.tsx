import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { NOTES_PER_PAGE, notesListQueryOptions } from "@/lib/api";
import { createQueryClient } from "@/lib/query-client";
import { OG_IMAGE, getSiteUrl } from "@/lib/seo";
import type { NoteTag } from "@/types/note";

import NotesPageClient from "./Notes.client";
import css from "./page.module.css";

const allowedTags: NoteTag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

interface NotesByTagPageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

function parseTag(slug: string[]) {
  if (slug.length !== 1) {
    notFound();
  }

  const [tag] = slug;

  if (tag === "all") {
    return "all" as const;
  }

  if (!allowedTags.includes(tag as NoteTag)) {
    notFound();
  }

  return tag as NoteTag;
}

export async function generateMetadata({
  params,
}: NotesByTagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const activeTag = parseTag(slug);
  const filterLabel = activeTag === "all" ? "all notes" : `${activeTag} notes`;
  const url = getSiteUrl(`/notes/filter/${slug.join("/")}`);

  return {
    title: `${filterLabel} | NoteHub`,
    description: `Browse ${filterLabel} in NoteHub and quickly find the notes you need.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${filterLabel} | NoteHub`,
      description: `Browse ${filterLabel} in NoteHub and quickly find the notes you need.`,
      url,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${filterLabel} Open Graph image`,
        },
      ],
    },
  };
}

export default async function NotesByTagPage({
  params,
  searchParams,
}: NotesByTagPageProps) {
  const { slug } = await params;
  const { page, search } = await searchParams;
  const activeTag = parseTag(slug);
  const currentPage = Number(page) > 0 ? Number(page) : 1;
  const searchQuery = search?.trim() ?? "";
  const queryClient = createQueryClient();
  const queryParams = {
    page: currentPage,
    perPage: NOTES_PER_PAGE,
    ...(searchQuery ? { search: searchQuery } : {}),
    ...(activeTag === "all" ? {} : { tag: activeTag }),
  };

  await queryClient.prefetchQuery(notesListQueryOptions(queryParams));

  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <h1 className={css.title}>Notes</h1>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesPageClient activeTag={activeTag} />
      </HydrationBoundary>
    </main>
  );
}
