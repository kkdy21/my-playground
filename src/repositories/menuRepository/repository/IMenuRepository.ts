import type { MenuDTO } from "@/repositories/menuRepository/schema/dto/menuDTO";
//TODO MSW 적용후 사용할지 검토
export interface IMenuRepository {
  getMenuList(): Promise<MenuDTO[]>;
}
