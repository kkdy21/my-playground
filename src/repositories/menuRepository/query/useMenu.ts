import { useQuery } from "@tanstack/react-query";
import { menuRepository } from "@/repositories/menuRepository/repository/menuRepository";
import type { MenuDTO } from "@/repositories/menuRepository/schema/dto/menuDTO";
import type { MenuEntity } from "@/repositories/menuRepository/entity/menuEntity";
import { MenuMapper } from "../mapper/menuMapper";

export const MENU_KEYS = {
  all: ["menu"],
  lists: () => [...MENU_KEYS.all, "list"] as const,
  list: (filters: { role?: string } = {}) =>
    [...MENU_KEYS.lists(), filters] as const,
} as const;

export const useGetMenu = (filters: { role?: string } = {}) => {
  return useQuery<MenuDTO[], Error, MenuEntity[]>({
    queryKey: MENU_KEYS.list(filters),
    queryFn: async () => await menuRepository.getMenuList(),
    select: (data) => MenuMapper.toMenuEntities(data),
  });
};
