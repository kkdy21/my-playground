import type { BookmarkDTOModel } from "../model/bookmarkDTOModel";
import type { BookmarkDTO } from "../schema/dto/bookmarkDTO";

export class BookmarkMapper {
  static toBookmarkDTOModel(response: BookmarkDTO): BookmarkDTOModel {
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

  static toBookmarkDTOModels(responses: BookmarkDTO[]): BookmarkDTOModel[] {
    return responses.map((response) => this.toBookmarkDTOModel(response));
  }
}
