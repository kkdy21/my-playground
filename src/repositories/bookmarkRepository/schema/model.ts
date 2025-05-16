//DTOmodel은 프론트엔드에서 사용할 데이터 타입

import { BOOKMARK_TYPE } from "../constants";

export type BookmarkDTOModel = {
  id: string;
  name: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  bookmarkType: BOOKMARK_TYPE;
  description: string;
};
