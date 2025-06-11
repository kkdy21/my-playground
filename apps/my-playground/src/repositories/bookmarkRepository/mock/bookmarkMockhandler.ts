// src/repositories/bookmarkRepository/mock/bookmarkMockhandler.ts
import type { BookmarkDTO } from "@/repositories/bookmarkRepository/schema/dto/bookmarkDTO";
import type { MockHandlerGroup, MockHandlerItem } from "msw-controller";
import { http, HttpResponse } from "msw";
import { BOOKMARK_TYPE } from "../constants";

// 핸들러 ID 상수 정의
const BOOKMARK_GROUP_NAME = "bookmark";

const BOOKMARK_HANDLER_IDS = {
  GET_BOOKMARKS: `${BOOKMARK_GROUP_NAME}_list`, // bookmarks_get_list -> bm_list (짧게 변경)
  GET_BOOKMARK_BY_ID: `${BOOKMARK_GROUP_NAME}_get_by_id`,
  CREATE_BOOKMARK: `${BOOKMARK_GROUP_NAME}_create`,
  UPDATE_BOOKMARK: `${BOOKMARK_GROUP_NAME}_update`,
  DELETE_BOOKMARK: `${BOOKMARK_GROUP_NAME}_delete`,
} as const;

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";

export const bookmarkMockHandlers: Record<string, MockHandlerItem> = {
  [BOOKMARK_HANDLER_IDS.GET_BOOKMARKS]: {
    id: BOOKMARK_HANDLER_IDS.GET_BOOKMARKS,
    description: "GET /api/bookmarks (북마크 목록)",
    handler: http.get(`${baseUrl}/api/bookmarks`, ({ request }) => {
      const url = new URL(request.url);
      const tag = url.searchParams.get("tag");
      const search = url.searchParams.get("search");
      console.log(
        `[MSW] Mocking GET /api/bookmarks (tag: ${tag}, search: ${search})`
      );
      // 실제 요청 파라미터에 따른 다양한 응답을 모킹할 수 있습니다.
      const mockBookmarks: BookmarkDTO[] = [
        {
          id: "1",
          title: "MSW 공식 문서",
          url: "https://mswjs.io",
          description: "MSW 가이드",
          tags: ["msw", "tool"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: BOOKMARK_TYPE.ADMIN,
        },
        {
          id: "2",
          title: "React Query",
          url: "https://tanstack.com/query",
          description: "데이터 페칭 라이브러리",
          tags: ["react", "data"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: BOOKMARK_TYPE.USER,
        },
      ];
      return HttpResponse.json(mockBookmarks);
    }),
  },
  [BOOKMARK_HANDLER_IDS.GET_BOOKMARK_BY_ID]: {
    id: BOOKMARK_HANDLER_IDS.GET_BOOKMARK_BY_ID,
    description: "GET /api/bookmarks/:bookMark_id (북마크 상세)",
    handler: http.get(`${baseUrl}/api/bookmarks/:bookMark_id`, ({ params }) => {
      const { bookMark_id } = params;
      console.log(`[MSW] Mocking GET /api/bookmarks/${bookMark_id}`);
      if (bookMark_id === "1") {
        return HttpResponse.json({
          id: "1",
          title: "MSW 공식 문서",
          url: "https://mswjs.io",
          description: "MSW 가이드",
          tags: ["msw", "tool"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      return new HttpResponse(null, { status: 404 });
    }),
  },
  [BOOKMARK_HANDLER_IDS.CREATE_BOOKMARK]: {
    id: BOOKMARK_HANDLER_IDS.CREATE_BOOKMARK,
    description: "POST /api/bookmarks (북마크 생성)",
    handler: http.post(`${baseUrl}/api/bookmarks`, async ({ request }) => {
      const newBookmark = (await request.json()) as Omit<
        BookmarkDTO,
        "id" | "createdAt" | "updatedAt"
      >;
      console.log("[MSW] Mocking POST /api/bookmarks", newBookmark);
      const createdBookmark: BookmarkDTO = {
        id: String(Date.now()),
        ...newBookmark,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return HttpResponse.json(createdBookmark, { status: 201 });
    }),
  },
  [BOOKMARK_HANDLER_IDS.UPDATE_BOOKMARK]: {
    id: BOOKMARK_HANDLER_IDS.UPDATE_BOOKMARK,
    description: "PUT /api/bookmarks/:bookmarkId (북마크 수정)",
    handler: http.put(
      `${baseUrl}/api/bookmarks/:bookmarkId`,
      async ({ params, request }) => {
        const { bookmarkId } = params;
        const updatedData = (await request.json()) as Partial<
          Omit<BookmarkDTO, "id" | "createdAt" | "updatedAt">
        >;
        console.log(
          `[MSW] Mocking PUT /api/bookmarks/${bookmarkId}`,
          updatedData
        );
        // 실제 업데이트 로직 대신 간단한 응답 반환
        return HttpResponse.json({
          id: bookmarkId as string,
          title: updatedData.title || "Updated Title",
          url: updatedData.url || "http://updated.com",
          description: updatedData.description || "Updated desc",
          tags: updatedData.tags || [],
          createdAt: new Date().toISOString(), // 실제로는 기존 생성일 유지
          updatedAt: new Date().toISOString(),
        });
      }
    ),
  },
  [BOOKMARK_HANDLER_IDS.DELETE_BOOKMARK]: {
    id: BOOKMARK_HANDLER_IDS.DELETE_BOOKMARK,
    description: "DELETE /api/bookmarks/:id (북마크 삭제)",
    handler: http.delete(`${baseUrl}/api/bookmarks/:id`, ({ params }) => {
      const { id } = params;
      console.log(`[MSW] Mocking DELETE /api/bookmarks/${id}`);
      return new HttpResponse(null, { status: 204 }); // 성공적으로 삭제됨 (No Content)
    }),
  },
};

export const bookmarkMockHandlerGroup: MockHandlerGroup = {
  groupName: BOOKMARK_GROUP_NAME,
  id: "bookmark",
  description: "북마크 관련 핸들러",
  handlers: bookmarkMockHandlers,
};
