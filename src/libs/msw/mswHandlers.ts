import { menuMockHandlers } from "@/repositories/menuRepository/mock/menuMockhandler";
import { bookmarkMockHandlers } from "@/repositories/bookmarkRepository/mock/bookmarkMockhandler";
import type { MockHandlerItem } from "@/types/msw";


// 모든 핸들러 정보 객체를 통합합니다.
// API 그룹 이름을 키로 사용하고, 값은 해당 그룹의 핸들러 정보 객체입니다.
export const allMockHandlerInfoGroups: Record<
  string,
  Record<string, MockHandlerItem>
> = {
  menu: menuMockHandlers,
  bookmark: bookmarkMockHandlers,
};
