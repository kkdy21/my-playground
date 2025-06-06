import { type BookmarkKey, isBookmarkType, BOOKMARK_TYPE } from "../constants";
import type { BookmarkDTO } from "../schema/dto/bookmarkDTO";

export class BookmarkEntity {
  constructor(private _dto: BookmarkDTO, public readonly index: number) {}

  get id(): string {
    return this._dto.id;
  }

  get name(): string {
    return this._dto.title;
  }

  get link(): string {
    return this._dto.url;
  }

  get createdAt(): Date {
    return new Date(this._dto.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._dto.updatedAt);
  }

  get description(): string {
    return this._dto.description;
  }

  get bookmarkType(): BookmarkKey {
    if (isBookmarkType(this._dto.type)) {
      return this._dto.type;
    }
    return BOOKMARK_TYPE.USER;
  }
  get dto(): BookmarkDTO {
    return this._dto;
  }
}
