import { BookmarkMapper } from '../mapper/BookmarkMapper';

export const BOOKMARK_KEYS = {
    all: ['bookmarks'] as const,
    lists: () => [...BOOKMARK_KEYS.all, 'list'] as const,
    list: (filters: { tag?: string; search?: string } = {}) =>
        [...BOOKMARK_KEYS.lists(), filters] as const,
    details: () => [...BOOKMARK_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...BOOKMARK_KEYS.details(), id] as const,
} as const;

const bookmarkRepository = new BookmarkRepository();

export const useBookmark = (id: string) => {
    return useQuery<Bookmark>({
        queryKey: BOOKMARK_KEYS.detail(id),
        queryFn: async () => {
            const response = await bookmarkRepository.getBookmark(id);
            return BookmarkMapper.toBookmark(response);
        },
        enabled: !!id,
    });
};

