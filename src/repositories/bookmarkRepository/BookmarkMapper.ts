export class BookmarkMapper {
    static mapBookmarkTypeToBookmark(bookmarkType: BookmarkType): Bookmark {
        return {
            id: bookmarkType.id,
            name: bookmarkType.name,
            link: bookmarkType.link,
        };
    }

    static mapBookmarkToBookmarkType(bookmark: Bookmark): BookmarkType {
        return {
            id: bookmark.id,
            name: bookmark.name,
            link: bookmark.link,
        };
    }

    static mapBookmarkTypeToBookmarkListResponse(
        bookmarkTypeList: BookmarkType[],
        totalCount: number
    ): BookmarkListResponse {
        return {
            results: bookmarkTypeList.map((bookmarkType) => BookmarkMapper.mapBookmarkTypeToBookmark(bookmarkType)),
            total_count: totalCount,
        };
    }
}
