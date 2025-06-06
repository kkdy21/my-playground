import { menuMockHandlerGroup } from "@/repositories/menuRepository/mock/menuMockhandler";
import type { MockHandlerGroup } from "@/libs/msw/types";
import type { HandlerEnabledState } from "@/types/msw";
import { bookmarkMockHandlerGroup } from "@/repositories/bookmarkRepository/mock/bookmarkMockhandler";

// 모든 핸들러 정보 객체를 통합합니다.
// API 그룹 이름을 키로 사용하고, 값은 해당 그룹의 핸들러 정보 객체입니다.
export const mockHandlerGroups: Record<string, MockHandlerGroup> = {
  [menuMockHandlerGroup.groupName]: menuMockHandlerGroup,
  [bookmarkMockHandlerGroup.groupName]: bookmarkMockHandlerGroup,
};

export const initialHandlerStates: HandlerEnabledState = Object.fromEntries(
  Object.values(mockHandlerGroups).flatMap((group) =>
    Object.entries(group.handlers).map(([key]) => [key, true])
  )
);