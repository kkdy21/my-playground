import BaseRepository from "../baseRepository.ts";
import type {BookmarkModel} from "./schema/model.ts";
import type {BookmarkPostParameters} from "./schema/api-verbs/post.ts";


export interface IBookmark {
    getBookmarks: (userId: string) => Promise<BookmarkModel[]>;
}

export class BookmarkRepository extends BaseRepository implements IBookmark {
    bookmarkMapper: BookmarkMapper;

    constructor() {
        super();
        this.bookmarkMapper = new BookmarkMapper();
    }

    async getBookmarks(userId: string) {
        await this.get<BookmarkModel[]>(`/users/${userId}/bookmarks`);
        return this.bookmarkMapper.mapBookmarkToBookmarkType();
    }

    async addBookmark(params : BookmarkPostParameters) {
        return this.post<BookmarkModel, BookmarkPostParameters>(`/users/bookmarks`, params);
    }

}
