import BaseRepository from "../../baseRepository.ts";
import type {
  BookmarkGetListParameters,
  BookmarkGetParameters,
} from "../schema/api-verbs/get.ts";
import type { BookmarkCreateParameters } from "../schema/api-verbs/create.ts";
import type { BookmarkUpdateParameters } from "../schema/api-verbs/update.ts";
import type { BookmarkDTO } from "../types.ts";
class BookmarkRepository extends BaseRepository {
  async getBookmarks(
    reqParams?: BookmarkGetListParameters
  ): Promise<BookmarkDTO[]> {
    const params = new URLSearchParams();
    if (reqParams?.tag) params.append("tag", reqParams.tag);
    if (reqParams?.search) params.append("search", reqParams.search);

    const queryString = params.toString();
    const url = `/api/bookmarks${queryString ? `?${queryString}` : ""}`;
    return this.get<BookmarkDTO[]>(url);
  }

  async getBookmark(params: BookmarkGetParameters): Promise<BookmarkDTO> {
    return this.get<BookmarkDTO>(`/api/bookmarks/${params.bookMark_id}`);
  }

  async createBookmark(params: BookmarkCreateParameters): Promise<BookmarkDTO> {
    return this.post<BookmarkDTO, BookmarkCreateParameters>(
      "/api/bookmarks",
      params
    );
  }

  async updateBookmark(params: BookmarkUpdateParameters): Promise<BookmarkDTO> {
    return this.put<BookmarkDTO, BookmarkUpdateParameters>(
      `/api/bookmarks/${params.bookmarkId}`,
      params
    );
  }

  async deleteBookmark(id: string): Promise<void> {
    return this.delete<void>(`/api/bookmarks/${id}`);
  }
}
export const bookmarkRepository = new BookmarkRepository();
