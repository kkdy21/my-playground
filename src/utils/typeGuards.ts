import { Role } from '../repositories/menuRepository/constants';

/**
 * Role 타입에 대한 타입가드
 */
export function isRole(value: unknown): value is Role {
  return value === 'admin' || value === 'user';
}

/**
 * 특정 Role 값인지 확인하는 타입가드 생성 함수
 */
export function createRoleGuard<T extends Role>(role: T) {
  return function(value: unknown): value is T {
    return value === role;
  };
}

// 미리 정의된 특정 Role 타입가드
export const isAdmin = (value: unknown): value is 'admin' => value === 'admin';
export const isUser = (value: unknown): value is 'user' => value === 'user';

/**
 * infer를 사용하여 Role 타입인지 확인하고 해당 타입을 추론하는 타입 유틸리티
 */
export type InferRole<T> = T extends Role ? T : never;

/**
 * infer를 활용한 Role 타입가드 함수
 */
export function inferIsRole<T>(value: T): value is T & Role {
  return typeof value === 'string' && (value === 'admin' || value === 'user');
}

/**
 * 특정 Role 값을 추론하는 타입가드 함수
 */
export function isInferredRole<R extends Role>(value: unknown, role: R): value is R {
  return value === role;
}

/**
 * 타입에서 Role 속성을 추출하는 타입 유틸리티
 */
export type ExtractRole<T> = T extends { role: infer R } ? R extends Role ? R : never : never; 