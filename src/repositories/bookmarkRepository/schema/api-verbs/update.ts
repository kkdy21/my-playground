import type {BookmarkResponse} from "../model.ts";

export interface BookmarkUpdateParameters{
    bookmarkId : string;
    bookmark : Partial<Omit<BookmarkResponse, 'id' | 'createdAt' | 'updatedAt'>>
}
