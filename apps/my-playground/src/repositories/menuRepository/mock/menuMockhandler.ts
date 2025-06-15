import { http, HttpResponse } from "msw";
import type { MenuDTO } from "../schema/dto/menuDTO";
import type { MockHandlerItem, MockHandlerGroup } from "msw-controller";
/*
  개별 핸들러에 ID를 부여하고 객체형태로 관리.
*/

const MENU_GROUP_NAME = "menu";

const MENU_HANDLER_IDS = {
  GET_MENU_LIST: `${MENU_GROUP_NAME}_list`,
} as const;

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";

export const menuMockHandlers: Record<string, MockHandlerItem> = {
  [MENU_HANDLER_IDS.GET_MENU_LIST]: {
    id: MENU_HANDLER_IDS.GET_MENU_LIST,
    description: "GET /api/menu (메뉴 목록 조회)",
    handler: http.get(`${baseUrl}/api/menu`, (): HttpResponse<MenuDTO[]> => {
      console.log("[MSW] Mocking GET /api/menu");
      return HttpResponse.json([
        {
          id: "menu1",
          title: "대시보드 (Mock)",
          path: "/dashboard",
          icon: "dashboard",
          children: [],
          role: "ADMIN",
          order: 0,
        },
        {
          id: "menu2",
          title: "북마크 관리 (Mock)",
          path: "/bookmarks",
          icon: "bookmarks",
          children: [],
          role: "USER",
          order: 1,
        },
      ]);
    }),
  },
};

export const menuMockHandlerGroup: MockHandlerGroup = {
  groupName: "menu",
  description: "메뉴 관련 핸들러",
  handlers: menuMockHandlers,
};

// post에 관한 typescript
// https://mswjs.io/docs/best-practices/typescript
