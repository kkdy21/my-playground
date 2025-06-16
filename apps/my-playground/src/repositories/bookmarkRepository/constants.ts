/**
* { id, value, label } 구조의 역할과 장점

### id: 프론트엔드 내부용 식별자 (Stable Frontend Identifier)
- 역할: 프론트엔드 코드 내에서 특정 옵션을 식별하기 위한 고유하고 안정적인 키입니다.
- 사용 예:
  - React/Vue 등에서 리스트 렌더링 시 key 값으로 사용 (key={option.id})
  - 로직 분기 처리 (if (selected.id === 'ACTIVE') { ... })
  - 상태 관리 라이브러리에서 특정 아이템을 참조할 때
- 장점: 백엔드에서 사용하는 value 값이 변경되더라도(예: 1 -> PAYMENT_CARD), 프론트엔드 코드는 id를 바라보기 때문에 전혀 영향을 받지 않습니다. 프론트엔드 로직과 백엔드 데이터의 의존성을 분리하는 핵심적인 역할을 합니다.

### value: 백엔드와의 계약 (API Contract Value)
- 역할: 서버로 데이터를 전송하거나 서버로부터 데이터를 받을 때 사용하는 값입니다. 즉, API 스키마와 일치시켜야 하는 값입니다.
- 사용 예:
  - 폼(Form) 전송 시 서버에 보낼 값
  - API 응답으로 받은 값을 해석할 때
- 장점: 프론트엔드의 UI(label)나 내부 로직(id)이 어떻게 바뀌든, 서버와의 통신 규약은 이 value를 통해 일관되게 유지됩니다.

### label: 사용자 표시용 텍스트 (UI Display Text)
- 역할: 화면의 드롭다운, 라디오 버튼, 표 등에 사용자에게 직접 보여줄 텍스트입니다.
- 사용 예:
  - <option value={option.value}>{option.label}</option>
- 장점: 언제든지 기획 변경이나 다국어 지원(i18n) 등으로 텍스트를 수정해야 할 때, label 값만 바꾸면 되므로 다른 로직에 전혀 영향을 주지 않습니다.
 */

export const BOOKMARK_TYPE_OPTIONS = [
  { id: "ADMIN", value: "1", label: "관리자" },
  { id: "WORKSPACE", value: "2", label: "워크스페이스" },
  { id: "USER", value: "3", label: "사용자" },
] as const;

export const BOOKMARK_TYPE_OPTIONS_WITH_ALL = [
  { id: "ALL", value: "0", label: "전체" },
  ...BOOKMARK_TYPE_OPTIONS,
] as const;

/*
2. 파생 유틸리티
위 원본 데이터를 기반으로, 코드의 안정성과 편의성을 높이기 위한 여러 유틸리티를 동적으로 생성합니다.
2.1. 타입 (Types)
목적 (Why): 타입 안정성을 확보합니다. 허용된 id나 value 외의 값이 사용되는 것을 컴파일 시점에 막아 버그를 원천 차단하고, 자동 완성을 지원합니다.
구현 (How): typeof와 인덱싱([number])을 사용하여 배열로부터 타입을 자동으로 추출합니다.
 */

/** 실제 결제 수단 옵션의 타입 */
export type BookmartOption = (typeof BOOKMARK_TYPE_OPTIONS)[number];

export type BookmarkOptionWithAll =
  (typeof BOOKMARK_TYPE_OPTIONS_WITH_ALL)[number];
/** 실제 결제 수단의 ID 타입 ('ALL' 제외) */
/** 실제 결제 수단의 Value 타입 ('ALL' 제외) */

/*
2.2. ID 상수 객체 (ID Constant Object)
목적 (Why): 코드 전체에서 'CREDIT_CARD'와 같은 "매직 문자열"을 사용하는 것을 방지합니다. if (method.id === PAYMENT_METHOD_ID.CREDIT_CARD) 와 같이 오타 없이 안전하고 가독성 높은 비교 코드를 작성할 수 있게 해줍니다.
구현 (How): 원본 배열(...OPTIONS)을 reduce하여 { CREDIT_CARD: 'CREDIT_CARD', ... } 형태의 객체를 동적으로 생성합니다.
 */

export const BOOKMART_TYPE_ID_WITH_ALL = BOOKMARK_TYPE_OPTIONS_WITH_ALL.reduce<
  Record<BookmarkOptionWithAll["id"], BookmarkOptionWithAll["id"]>
>((acc, option) => {
  acc[option.id] = option.id;
  return acc;
}, {} as Record<BookmarkOptionWithAll["id"], BookmarkOptionWithAll["id"]>);

/*

2.3. 조회용 맵과 헬퍼 함수 (Lookup Maps & Helpers)
목적 (Why): 특정 id나 value를 가지고 다른 정보(예: label)를 찾아야 할 때, 매번 find()나 filter()로 전체 배열을 순회하는 것은 비효율적이고 번거롭습니다. Map을 미리 만들어두면 매우 빠르고(O(1)) 편리하게 데이터를 조회할 수 있습니다.
구현 (How): new Map() 생성자를 활용하여 필요한 조회용 맵을 미리 만들어두고, 이를 사용하는 간단한 헬퍼 함수를 외부에 노출(export)합니다.
*/

export const idToOptionMap = new Map(
  BOOKMARK_TYPE_OPTIONS.map((option) => [option.id, option])
);
export const valueToOptionMap = new Map(
  BOOKMARK_TYPE_OPTIONS.map((option) => [option.value, option])
);

/**
 * ID를 기반으로 해당하는 '실제' 옵션 객체 전체를 반환합니다.
 * 이 함수를 통해 옵션의 label, value 등 모든 속성에 접근할 수 있습니다.
 * @param id - 'ALL'을 제외한 실제 결제 수단 ID
 * @returns {BookmartOptionId | undefined} 해당하는 옵션 객체 또는 undefined
 */
export const getOptionById = (
  id: BookmartOption["id"]
): BookmartOption | undefined => {
  return idToOptionMap.get(id);
};

export const getOptionByValue = (
  value: BookmartOption["value"]
): BookmartOption | undefined => {
  return valueToOptionMap.get(value);
};

export const isBookmarkType = (id: string): id is BookmartOption["id"] => {
  return idToOptionMap.has(id as BookmartOption["id"]);
};

/*
1. ALL option은 따로 처리해야함. 실질 적으로 ALL 옵션은 실제 옵션이 아니기 때문. 실제 사용할 때 all 옵션이 실제 옵션인지 아닌지 판단할때 실제 옵션이 아니므로 프론트에 또는 코드에 알려줘야함 이에 따른 헬퍼함수도필요
2. value에서 option변환, id에서 option변환 후 이에 따라 label이든 value든 id든 조회하는 방식으로 바꾸는게 어떤지 ( 쓸때없는 헬퍼함수들이 많아지는것 같아서 ) 

*/
