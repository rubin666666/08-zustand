import Link from "next/link";

import type { NoteTag } from "@/types/note";

import css from "./SidebarNotes.module.css";

const tags: Array<NoteTag | "all"> = [
  "all",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

interface SidebarNotesProps {
  activeTag: NoteTag | "all";
}

export default function SidebarNotes({ activeTag }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => {
        const href = `/notes/filter/${tag}`;
        const label = tag === "all" ? "All notes" : tag;
        const className =
          tag === activeTag ? `${css.menuLink} ${css.active}` : css.menuLink;

        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={className}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
