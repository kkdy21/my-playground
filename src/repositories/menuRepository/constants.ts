/**
 * 백엔드와 UI 간의 메뉴 액션 정보 관리 하기위한 상수 관리
 * 레코드(Record) 방식 사용하고 readonly 속성을 통해 타입 안정성 보장
 * 유효성 검사 기능으로 백엔드에서 넘어오는 문자열이 정의된 키 중 하나인지 검사할 수 있어야 함.
 * TypeScript의 type guard 를 활용해 검사 함수 사용 시 key의 타입이 자동으로 좁혀지기를 원함.
 * 이를 위해 재사용 가능한 validator 함수 (createKeyValidator) 도입
 */

import { createKeyValidator } from "@/types/keyTypeValidator";

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  GUEST: "GUEST",
} as const;

export const ROLES_WITH_ALL = {
  ...ROLES,
  ALL: "ALL",
} as const;

export const ROLES_LABEL = {
  [ROLES.ADMIN]: "관리자",
  [ROLES.USER]: "사용자",
  [ROLES.GUEST]: "게스트",
  [ROLES_WITH_ALL.ALL]: "모든 권한",
} as const;

export type Roles = (typeof ROLES_WITH_ALL)[keyof typeof ROLES_WITH_ALL];
export type RolesWithAll = (typeof ROLES_WITH_ALL)[keyof typeof ROLES_WITH_ALL];

// Roles에 대한 유효성 검사기
export const isValidRole = createKeyValidator<typeof ROLES>(ROLES);
export const getRoleLabel = (key: RolesWithAll) => {
  return ROLES_LABEL[key];
};