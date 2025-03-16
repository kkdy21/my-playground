import type {BookmarkModel, BookmarkResponse} from "../schema/model.ts";

export class BookmarkMapper {
    static toBookmark(response: BookmarkResponse): BookmarkModel {
        return {
            id: response.id,
            name: response.title,
            link: response.url,
            createdAt: new Date(response.createdAt),
            updatedAt: new Date(response.updatedAt),
            description: response.description,
            bookmarkType: "admin"
        };
    }

    static toBookmarks(responses: BookmarkResponse[]): BookmarkModel[] {
        return responses.map(response => this.toBookmark(response));
    }
} 
