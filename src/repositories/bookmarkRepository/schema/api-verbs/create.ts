import type {BookmarkResponse} from "../model.ts";

export interface BookmarkCreateParameters{
    bookmark: Omit<BookmarkResponse, 'id' | 'createdAt' | 'updatedAt'>
}
