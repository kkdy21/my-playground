import type { MenuDTO } from "../schema/dto/menuDTO";
import type { MenuEntity } from "../entity/menuEntity";
import { isValidRoleKey } from "../constants";

export class MenuMapper {
  static toMenuEntity(menu: MenuDTO): MenuEntity {
    return {
      id: menu.id,
      title: menu.title,
      path: menu.path,
      icon: menu.icon,
      children: menu.children.map((child) => this.toMenuEntity(child)),
      role: isValidRoleKey(menu.role) ? menu.role : "GUEST",
      order: menu.order,
    };
  }

  static toMenuEntities(menus: MenuDTO[]): MenuEntity[] {
    return menus.map((menu) => this.toMenuEntity(menu));
  }
}
