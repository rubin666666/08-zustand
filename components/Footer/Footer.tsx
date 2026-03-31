import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <span>NoteHub</span>
        <span>Next.js App Router</span>
      </div>
    </footer>
  );
}
