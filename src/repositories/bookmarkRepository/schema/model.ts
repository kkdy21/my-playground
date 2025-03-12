import type {BOOKMARK_TYPE} from "./types.ts";

export interface BookmarkModel{
    id: string;
    name: string;
    folder: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    bookmarkType: BOOKMARK_TYPE;
}
