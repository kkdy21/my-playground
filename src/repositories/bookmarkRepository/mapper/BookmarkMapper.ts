import type { BookmarkDTOModel } from "../schema/model.ts";
import type { BookmarkDTO } from "../types.ts";

export class BookmarkMapper {
  static toBookmark(response: BookmarkDTO): BookmarkDTOModel {
    return {
      id: response.id,
      name: response.title,
      link: response.url,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
      description: response.description,
      bookmarkType: "admin",
    };
  }

  static toBookmarks(responses: BookmarkDTO[]): BookmarkDTOModel[] {
    return responses.map((response) => this.toBookmark(response));
  }
}
