import { createKeyValidator } from "@/utils/keyTypeValidator";

const BOOKMARK_TYPE = {
  ADMIN: "admin",
  WORKSPACE: "workspace",
  USER: "user",
} as const;

export type BookmarkKey = keyof typeof BOOKMARK_TYPE;
export type BookmarkValue = (typeof BOOKMARK_TYPE)[BookmarkKey];

export const isBookmarkType = createKeyValidator(BOOKMARK_TYPE);
