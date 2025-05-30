import { useQuery } from "@tanstack/react-query";
import { menuRepository } from "@/repositories/menuRepository/api/menuRepository";
import type { MenuDTO } from "@/repositories/menuRepository/schema/dto/menuDTO";
import { MenuEntity } from "@/repositories/menuRepository/entity/menuEntity";

export const MENU_KEYS = {
  all: ["menu"],
  lists: () => [...MENU_KEYS.all, "list"] as const,
  list: (filters: { role?: string } = {}) =>
    [...MENU_KEYS.lists(), filters] as const,
} as const;

export const useGetMenu = (filters: { role?: string } = {}) => {
  return useQuery<MenuDTO[], Error, MenuEntity[]>({
    queryKey: MENU_KEYS.list(filters),
    queryFn: async () => {
      const res = await menuRepository.getMenuList();
      return res.data;
    },
    select: (data) => data.map((item, index) => new MenuEntity(item, index)),
  });
};
