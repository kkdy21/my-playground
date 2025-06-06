import { bookmarkRepository } from "./bookmarkRepository/api/bookmarkRepository";
import { menuRepository } from "./menuRepository/api/menuRepository";
//한개의 referenceRepository를 만들어서 모든 repository들을 여기에 import 후 사용.
// 추후 다른 repository들이 추가될 때마다 여기에 import

export interface Repositories {
  bookmark: typeof bookmarkRepository;
  menu: typeof menuRepository;
}

export const referenceRepository: Repositories = {
  bookmark: bookmarkRepository,
  menu: menuRepository,
  // 추후 다른 repository 인스턴스들도 여기에 추가
};
