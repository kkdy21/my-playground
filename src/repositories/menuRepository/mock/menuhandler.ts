import { http, HttpResponse } from "msw";
import type { MenuDTO } from "../schema/dto/menuDTO";

export const menuHandler = [
  http.get("/api/menu", (): HttpResponse<MenuDTO[]> => {
    return HttpResponse.json([
      {
        id: "test",
        title: "test",
        path: "/test",
        icon: "test",
        children: [],
        role: "test",
        order: 0,
      },
    ]);
  }),
];

// post에 관한 typescript
// https://mswjs.io/docs/best-practices/typescript
