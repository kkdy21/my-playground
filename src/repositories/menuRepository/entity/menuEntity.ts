import type { RoleKey } from "@/repositories/menuRepository/constants";

export type MenuEntity = {
  id: string;
  title: string;
  path: string;
  icon: string;
  children: MenuEntity[];
  role: RoleKey;
  order: number;
};
