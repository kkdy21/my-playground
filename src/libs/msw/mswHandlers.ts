import { menuHandler } from "@/repositories/menuRepository/mock/menuMockhandler";
import { bookmarkHandler } from "@/repositories/bookmarkRepository/mock/bookmarkMockhandler";

// 모든 핸들러를 하나의 배열로 통합
export const mockHandlers = [...menuHandler, ...bookmarkHandler];
