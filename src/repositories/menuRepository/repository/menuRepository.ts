import BaseRepository from "@/repositories/baseRepository";
import type { MenuDTO } from "@/repositories/menuRepository/schema/dto/menuDTO";
import type { IMenuRepository } from "./IMenuRepository";

class MenuRepository extends BaseRepository implements IMenuRepository {
  async getMenuList(): Promise<MenuDTO[]> {
    return this.get<MenuDTO[]>(`/api/menu/`);
  }
}

export const menuRepository = new MenuRepository();
