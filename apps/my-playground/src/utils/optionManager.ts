// /utils/options.ts

// 제네릭 타입을 미리 정의하여 가독성을 높입니다.
type BaseOption = { id: string; value: string | number; label: string };
type OptionsArray = readonly BaseOption[];

// --- 함수 오버로딩 선언부 ---

// 시그니처 1: 'allOption'이 제공된 경우의 반환 타입을 정의합니다.
// ('ID_WITH_ALL' 등이 필수로 포함됩니다.)
export function createOptionsManager<
  T extends OptionsArray,
  A extends BaseOption & { id: "ALL" }
>(
  options: T,
  allOption: A
): {
  OPTIONS: T;
  ID: { [K in T[number]["id"]]: K };
  getOptionById: (id: T[number]["id"]) => T[number];
  getOptionByValue: (value: T[number]["value"]) => T[number];
  isValidOptionId: (id: string) => id is T[number]["id"];
  isValidOptionValue: (value: string | number) => value is T[number]["value"];
  ALL_OPTION: A;
  OPTIONS_WITH_ALL: readonly (A | T[number])[];
  ID_WITH_ALL: { [K in A["id"] | T[number]["id"]]: K };
};

// 시그니처 2: 'allOption'이 제공되지 않은 경우의 반환 타입을 정의합니다.
// ('ID_WITH_ALL' 등이 포함되지 않습니다.)
export function createOptionsManager<T extends OptionsArray>(
  options: T
): {
  OPTIONS: T;
  ID: { [K in T[number]["id"]]: K };
  getOptionById: (id: T[number]["id"]) => T[number];
  getOptionByValue: (value: T[number]["value"]) => T[number];
  isValidOptionId: (id: string) => id is T[number]["id"];
  isValidOptionValue: (value: string | number) => value is T[number]["value"];
};

// --- 함수 오버로딩 구현부 ---

// 'any'를 사용하여 실제 구현 로직을 작성할수도 있지만 복잡하지 않아서 타입 작성
export function createOptionsManager<
  T extends OptionsArray,
  A extends BaseOption & { id: "ALL" }
>(options: T, allOption?: A) {
  const idToOptionMap = new Map<T[number]["id"], T[number]>(
    options.map((o) => [o.id, o])
  );
  const valueToOptionMap = new Map<T[number]["value"], T[number]>(
    options.map((o) => [o.value, o])
  );

  const ID = Object.fromEntries(options.map((o) => [o.id, o.id])) as {
    [K in T[number]["id"]]: K;
  };

  const baseManager = {
    OPTIONS: options,
    ID,
    getOptionById: (id: T[number]["id"]) => idToOptionMap.get(id),
    getOptionByValue: (value: T[number]["value"]) =>
      valueToOptionMap.get(value),
    isValidOptionId: (id: string): id is T[number]["id"] =>
      idToOptionMap.has(id as T[number]["id"]),
    isValidOptionValue: (value: string | number): value is T[number]["value"] =>
      valueToOptionMap.has(value as T[number]["value"]),
  };

  if (allOption) {
    return {
      ...baseManager,
      ALL_OPTION: allOption,
      OPTIONS_WITH_ALL: [allOption, ...options],
      ID_WITH_ALL: { ...ID, [allOption.id]: allOption.id },
    };
  }

  return baseManager;
}
