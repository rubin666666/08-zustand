import { createSeoMetadata } from "@/lib/seo";

import css from "./not-found.module.css";

export const metadata = createSeoMetadata({
  title: "404 | NoteHub",
  description:
    "The requested NoteHub page does not exist. Please check the address and try again.",
  path: "/not-found",
});

export default function NotFound() {
  return (
    <main className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
