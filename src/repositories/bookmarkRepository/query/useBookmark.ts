import { BookmarkMapper } from "../mapper/bookmarkMapper.ts";
import { referenceRepository } from "../../referenceRepository.ts";
import { useQuery } from "@tanstack/react-query";
import type { BookmarkDTO } from "@/repositories/bookmarkRepository/schema/model";
import type { BookmarkDTOModel } from "@/repositories/bookmarkRepository/types.ts";

// react query hook을 server state로 사용하는 방식을 채택, select함수를 통해 response를 model로 변환하는 방식생각.
export const BOOKMARK_KEYS = {
  all: ["bookmarks"] as const,
  lists: () => [...BOOKMARK_KEYS.all, "list"] as const,
  list: (filters: { tag?: string; search?: string } = {}) =>
    [...BOOKMARK_KEYS.lists(), filters] as const,
  details: () => [...BOOKMARK_KEYS.all, "detail"] as const,
  detail: (id: string) => [...BOOKMARK_KEYS.details(), id] as const,
} as const;

export const useBookmark = (id: string) => {
  return useQuery<BookmarkDTO, Error, BookmarkDTOModel>({
    queryKey: BOOKMARK_KEYS.detail(id),
    queryFn: async () =>
      await referenceRepository.bookmark.getBookmark({ bookMark_id: id }),
    select: (data) => BookmarkMapper.toBookmarkDTOModel(data),
    enabled: !!id,
  });
};
