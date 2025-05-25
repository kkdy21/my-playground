import { http, HttpResponse } from "msw";
import type { BookmarkDTO } from "@/repositories/bookmarkRepository/schema/dto/bookmarkDTO";

export const bookmarkHandler = [
  http.get("/api/bookmark", (): HttpResponse<BookmarkDTO[]> => {
    return HttpResponse.json([]);
  }),
];  