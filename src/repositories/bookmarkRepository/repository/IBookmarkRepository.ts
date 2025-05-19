import type { BookmarkDTO } from "../schema/dto/bookmarkDTO";

import type { BookmarkCreateParameters } from "../schema/api-verbs/create";
import type {
  BookmarkGetListParameters,
  BookmarkGetParameters,
} from "../schema/api-verbs/get";
import type { BookmarkUpdateParameters } from "../schema/api-verbs/update";

export interface IBookmarkRepository {
  getBookmarks(params: BookmarkGetListParameters): Promise<BookmarkDTO[]>;
  getBookmark(params: BookmarkGetParameters): Promise<BookmarkDTO>;
  createBookmark(params: BookmarkCreateParameters): Promise<BookmarkDTO>;
  updateBookmark(params: BookmarkUpdateParameters): Promise<BookmarkDTO>;
  deleteBookmark(id: string): Promise<void>;
}
