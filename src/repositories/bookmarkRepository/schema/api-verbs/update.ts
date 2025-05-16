import type { BookmarkDTO } from "../../types.ts";

export interface BookmarkUpdateParameters {
  bookmarkId: string;
  bookmark: Partial<Omit<BookmarkDTO, "id" | "createdAt" | "updatedAt">>;
}
