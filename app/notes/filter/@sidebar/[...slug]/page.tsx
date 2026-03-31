import type { NoteTag } from "@/types/note";

import SidebarNotes from "../SidebarNotes";

const allowedTags: Array<NoteTag | "all"> = [
  "all",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

interface SidebarPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function SidebarPage({ params }: SidebarPageProps) {
  const { slug } = await params;
  const activeTag = slug.length === 1 ? slug[0] : "all";
  const safeTag = allowedTags.includes(activeTag as NoteTag | "all")
    ? (activeTag as NoteTag | "all")
    : "all";

  return <SidebarNotes activeTag={safeTag} />;
}
