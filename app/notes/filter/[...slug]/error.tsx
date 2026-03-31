"use client";

import css from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Failed to load notes.</h2>
      <p className={css.message}>{error.message}</p>
      <button type="button" onClick={reset} className={css.button}>
        Try again
      </button>
    </div>
  );
}
