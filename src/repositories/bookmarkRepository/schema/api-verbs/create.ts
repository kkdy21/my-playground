import type { BookmarkDTO } from "../../types.ts";
export interface BookmarkCreateParameters {
  bookmark: Omit<BookmarkDTO, "id" | "createdAt" | "updatedAt">;
}
