export type MenuDTOModel = {
  id: string;
  title: string;
  path: string;
  icon: string;
  children: MenuDTOModel[];
  role: string;
  order: number;
};