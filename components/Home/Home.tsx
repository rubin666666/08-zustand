import Link from "next/link";

import css from "./Home.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>NoteHub</h1>
        <p className={css.description}>
          Organize your ideas, switch between note tags instantly, and open note
          details without losing the context of the current list.
        </p>
        <p className={css.description}>
          Start with the notes page to see parallel routes for tag filters and
          intercepted routes for note preview modals in action.
        </p>
        <Link href="/notes/filter/all">Go to notes</Link>
      </div>
    </main>
  );
}
