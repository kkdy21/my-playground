import type { BookmarkValue } from "../constants";

export type BookmarkDTOModel = {
  id: string;
  name: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  bookmarkType: BookmarkValue;
  description: string;
};
