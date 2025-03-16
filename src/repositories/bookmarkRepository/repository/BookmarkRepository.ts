import BaseRepository from "../../baseRepository";
import type {BookmarkResponse} from "../schema/model.ts";
import type {BookmarkGetListParameters, BookmarkGetParameters} from "../schema/api-verbs/get.ts";
import type {BookmarkCreateParameters} from "../schema/api-verbs/create.ts";
import type {BookmarkUpdateParameters} from "../schema/api-verbs/update.ts";


class BookmarkRepository extends BaseRepository {
    async getBookmarks(reqParams? : BookmarkGetListParameters): Promise<BookmarkResponse[]> {
        const params = new URLSearchParams();
        if (reqParams?.tag) params.append('tag', reqParams.tag);
        if (reqParams?.search) params.append('search', reqParams.search);
        
        const queryString = params.toString();
        const url = `/api/bookmarks${queryString ? `?${queryString}` : ''}`;
        return this.get<BookmarkResponse[]>(url);
    }

    async getBookmark(params: BookmarkGetParameters): Promise<BookmarkResponse> {
        return this.get<BookmarkResponse>(`/api/bookmarks/${params.bookMark_id}`);
    }

    async createBookmark(params: BookmarkCreateParameters): Promise<BookmarkResponse> {
        return this.post<BookmarkResponse, BookmarkCreateParameters>('/api/bookmarks', params);
    }

    async updateBookmark(params : BookmarkUpdateParameters): Promise<BookmarkResponse> {
        return this.put<BookmarkResponse, BookmarkUpdateParameters>(`/api/bookmarks/${params.bookmarkId}`, params);
    }

    async deleteBookmark(id: string): Promise<void> {
        return this.delete<void>(`/api/bookmarks/${id}`);
    }
} 

export const bookmarkRepository = new BookmarkRepository();
