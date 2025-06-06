/**
 * 상수 객체의 키 타입을 검증하는 함수
 * @param constantObject 검증할 상수 객체
 * @returns 검증 함수
 */

export function createKeyValidator<T extends Readonly<Record<string, unknown>>>(
  constantObject: T
) {
  return (key: string): key is Extract<keyof T, string> =>
    key in constantObject;
}
