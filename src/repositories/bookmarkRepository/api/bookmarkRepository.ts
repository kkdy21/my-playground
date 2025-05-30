import BaseRepository from "@/repositories/baseRepository.ts";
import type {
  BookmarkGetListParameters,
  BookmarkGetParameters,
} from "@/repositories/bookmarkRepository/schema/api-verbs/get.ts";
import type { BookmarkCreateParameters } from "@/repositories/bookmarkRepository/schema/api-verbs/create.ts";
import type { BookmarkUpdateParameters } from "@/repositories/bookmarkRepository/schema/api-verbs/update.ts";
import type { BookmarkDTO } from "@/repositories/bookmarkRepository/schema/dto/bookmarkDTO";
import type { IBookmarkRepository } from "./IBookmarkRepository";
import type { AxiosResponse } from "axios";

class BookmarkRepository extends BaseRepository implements IBookmarkRepository {
  async getBookmarks(
    reqParams?: BookmarkGetListParameters
  ): Promise<AxiosResponse<BookmarkDTO[]>> {
    const params = new URLSearchParams();
    if (reqParams?.tag) params.append("tag", reqParams.tag);
    if (reqParams?.search) params.append("search", reqParams.search);

    const queryString = params.toString();
    const url = `/api/bookmarks${queryString ? `?${queryString}` : ""}`;
    return this.get<BookmarkDTO[]>(url);
  }

  async getBookmark(
    params: BookmarkGetParameters
  ): Promise<AxiosResponse<BookmarkDTO>> {
    return this.get<BookmarkDTO>(`/api/bookmarks/${params.bookMark_id}`);
  }

  async createBookmark(
    params: BookmarkCreateParameters
  ): Promise<AxiosResponse<BookmarkDTO>> {
    return this.post<BookmarkDTO, BookmarkCreateParameters>(
      "/api/bookmarks",
      params
    );
  }

  async updateBookmark(
    params: BookmarkUpdateParameters
  ): Promise<AxiosResponse<BookmarkDTO>> {
    return this.put<BookmarkDTO, BookmarkUpdateParameters>(
      `/api/bookmarks/${params.bookmarkId}`,
      params
    );
  }

  async deleteBookmark(id: string): Promise<AxiosResponse<void>> {
    return this.delete<void>(`/api/bookmarks/${id}`);
  }
}
export const bookmarkRepository = new BookmarkRepository();
