import { MSWController } from "msw-controller";
import { menuMockHandlerGroup } from "@/repositories/menuRepository/mock/menuMockhandler";
import { bookmarkMockHandlerGroup } from "@/repositories/bookmarkRepository/mock/bookmarkMockhandler";

const IS_DEVELOPMENT = import.meta.env.MODE === "development";
const mockHandlerGroups = [menuMockHandlerGroup, bookmarkMockHandlerGroup];

export const mswController = new MSWController({
  enabled: IS_DEVELOPMENT,
  handlerGroups: mockHandlerGroups,
  logLevel: "en",
});
