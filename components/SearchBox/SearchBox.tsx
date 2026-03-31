"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  value = "",
  onChange,
  placeholder = "Search notes",
}: SearchBoxProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      className={css.input}
    />
  );
}
