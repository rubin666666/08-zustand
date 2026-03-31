"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { NOTES_PER_PAGE, notesListQueryOptions } from "@/lib/api";
import type { NoteTag } from "@/types/note";

import css from "./Notes.module.css";

interface NotesPageClientProps {
  activeTag: NoteTag | "all";
}

function buildUrl(
  searchParams: URLSearchParams,
  updates: Record<string, string | null>,
) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  });

  const query = params.toString();

  return query ? `?${query}` : "";
}

export default function NotesPageClient({ activeTag }: NotesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => {
    return searchParams.get("search") ?? "";
  });
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const currentPage = Math.max(Number(searchParams.get("page") ?? "1") || 1, 1);

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";
    const normalizedSearch = debouncedSearch.trim();

    if (currentSearch === normalizedSearch) {
      return;
    }

    const nextUrl = buildUrl(searchParams, {
      page: "1",
      search: normalizedSearch || null,
    });

    router.replace(nextUrl, { scroll: false });
  }, [debouncedSearch, router, searchParams]);

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      perPage: NOTES_PER_PAGE,
      ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      ...(activeTag === "all" ? {} : { tag: activeTag }),
    }),
    [activeTag, currentPage, debouncedSearch],
  );

  const { data, isLoading, isError, error } = useQuery({
    ...notesListQueryOptions(queryParams),
    refetchOnMount: false,
  });

  const handlePageChange = (selectedPage: number) => {
    const nextUrl = buildUrl(searchParams, {
      page: String(selectedPage + 1),
      search: debouncedSearch.trim() || null,
    });

    router.push(nextUrl, { scroll: false });
  };

  if (isLoading) {
    return <p className={css.message}>Loading notes...</p>;
  }

  if (isError) {
    return (
      <p className={css.message}>
        Something went wrong while loading notes: {error.message}
      </p>
    );
  }

  if (!data) {
    return <p className={css.message}>No data available.</p>;
  }

  if (data.notes.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.toolbar}>
          <div className={css.actions}>
            <SearchBox value={searchValue} onChange={setSearchValue} />
            <Link href="/notes/action/create" className={css.button}>
              Create note
            </Link>
          </div>
        </div>

        <p className={css.message}>No notes found for this filter.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <div className={css.actions}>
          <SearchBox value={searchValue} onChange={setSearchValue} />
          <Link href="/notes/action/create" className={css.button}>
            Create note
          </Link>
        </div>
        <p className={css.counter}>Total pages: {data.totalPages}</p>
      </div>

      <NoteList notes={data.notes} />
      <Pagination
        pageCount={data.totalPages}
        currentPage={currentPage - 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
