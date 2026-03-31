import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

import { getAuthToken } from "@/lib/api/auth";
import { notehubApi } from "@/lib/api/client";
import type {
  CreateNotePayload,
  Note,
  NotesQueryParams,
  NotesResponse,
} from "@/types/note";

export { getAuthToken } from "@/lib/api/auth";
export { notehubApi } from "@/lib/api/client";

export const NOTES_PER_PAGE = 12;

export const notesKeys = {
  all: ["notes"] as const,
  list: (params: NotesQueryParams) => ["notes", "list", params] as const,
  detail: (id: string) => ["notes", "detail", id] as const,
};

async function createAuthorizedConfig() {
  const token = await getAuthToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getNotes(
  params: NotesQueryParams = {},
): Promise<NotesResponse> {
  const config = await createAuthorizedConfig();
  const normalizedParams: NotesQueryParams = {
    page: params.page ?? 1,
    perPage: params.perPage ?? NOTES_PER_PAGE,
    sortBy: params.sortBy ?? "created",
    ...(params.search ? { search: params.search } : {}),
    ...(params.tag ? { tag: params.tag } : {}),
  };

  const { data } = await notehubApi.get<NotesResponse>("/notes", {
    ...config,
    params: normalizedParams,
  });

  return data;
}

export async function getNoteById(id: string): Promise<Note | null> {
  try {
    const config = await createAuthorizedConfig();
    const { data } = await notehubApi.get<Note>(`/notes/${id}`, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const config = await createAuthorizedConfig();
  const { data } = await notehubApi.post<Note>("/notes", payload, config);

  return data;
}

export function notesListQueryOptions(params: NotesQueryParams) {
  return queryOptions({
    queryKey: notesKeys.list(params),
    queryFn: () => getNotes(params),
  });
}

export function noteByIdQueryOptions(id: string) {
  return queryOptions({
    queryKey: notesKeys.detail(id),
    queryFn: () => getNoteById(id),
  });
}
