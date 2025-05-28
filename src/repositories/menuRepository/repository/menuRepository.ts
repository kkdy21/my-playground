import BaseRepository from "@/repositories/baseRepository";
import type { MenuDTO } from "@/repositories/menuRepository/schema/dto/menuDTO";
import type { IMenuRepository } from "./IMenuRepository";
import type { AxiosResponse } from "axios";

class MenuRepository extends BaseRepository implements IMenuRepository {
  async getMenuList(): Promise<AxiosResponse<MenuDTO[]>> {
    return this.get<MenuDTO[]>(`/api/menu`);
  }
}

export const menuRepository = new MenuRepository();
