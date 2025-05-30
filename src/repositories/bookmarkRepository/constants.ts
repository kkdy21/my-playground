/**
 * 백엔드와 UI 간의 북마크 타입 정보 관리 하기위한 상수 관리
 * 레코드(Record) 방식 사용하고 readonly 속성을 통해 타입 안정성 보장
 * 유효성 검사 기능으로 백엔드에서 넘어오는 문자열이 정의된 키 중 하나인지 검사할 수 있어야 함.
 * TypeScript의 type guard 를 활용해 검사 함수 사용 시 key의 타입이 자동으로 좁혀지기를 원함.
 * 이를 위해 재사용 가능한 validator 함수 (createKeyValidator) 도입
 */

import { createKeyValidator } from "@/utils/keyTypeValidator";

export const BOOKMARK_TYPE = {
  ADMIN: "ADMIN",
  WORKSPACE: "WORKSPACE",
  USER: "USER",
} as const;

export const BOOKMARK_TYPE_LABEL = {
  [BOOKMARK_TYPE.ADMIN]: "관리자",
  [BOOKMARK_TYPE.WORKSPACE]: "워크스페이스",
  [BOOKMARK_TYPE.USER]: "사용자",
} as const;

export type BookmarkKey = (typeof BOOKMARK_TYPE)[keyof typeof BOOKMARK_TYPE];
export type BookmarkValue = (typeof BOOKMARK_TYPE)[BookmarkKey];

// BookmarkType에 대한 유효성 검사기
export const isBookmarkType =
  createKeyValidator<typeof BOOKMARK_TYPE>(BOOKMARK_TYPE);
export const getBookmarkTypeLabel = (key: BookmarkValue) => {
  return BOOKMARK_TYPE_LABEL[key];
};
