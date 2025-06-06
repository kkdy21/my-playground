import js from "@eslint/js"; // 기본 JavaScript ESLint 규칙을 포함
import globals from "globals"; // 브라우저 및 Node.js 전역 변수 정의
import reactHooks from "eslint-plugin-react-hooks"; // React Hook 관련 규칙 플러그인
import reactRefresh from "eslint-plugin-react-refresh"; // React Fast Refresh 관련 플러그인
import tseslint from "typescript-eslint"; // TypeScript ESLint 설정 및 파서
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: ["dist", "node_modules"], // ESLint가 검사하지 않을 디렉토리 지정
  },
  {
    files: ["**/*.{ts,tsx}"], // TypeScript 및 TSX 파일에만 적용
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 문법 지원
      sourceType: "module", // import/export 사용 가능하게 설정
      globals: { ...globals.browser, ...globals.node }, // 브라우저 및 Node.js 환경 모두 고려
      parser: tseslint.parser, // TypeScript 코드 파싱을 위한 파서 지정
      parserOptions: {
        project: "./tsconfig.json", // tsconfig.json을 기준으로 타입 검사
        ecmaFeatures: {
          jsx: true, // JSX 문법 사용 가능하게 설정
        },
      },
    },
    extends: [importPlugin.flatConfigs.recommended],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Hooks 관련 권장 규칙
      ...reactHooks.configs.recommended.rules,
      // React Fast Refresh에서 사용하는 규칙: 컴포넌트만 export 하도록 제한
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // 상수 export는 허용
      ],

      // 일반 JS 규칙
      "max-len": ["error", { code: 200 }], // 한 줄 최대 길이 설정
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off", // console 사용 제한 (프로덕션에서만 에러)
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // debugger 사용 제한
      "no-unsafe-optional-chaining": 1, // 안전하지 않은 optional chaining 경고
      "no-undef": 1, // 정의되지 않은 변수 사용 경고
      "no-unused-vars": ["off"], // 사용하지 않는 변수 검사 끔 (TS 버전 사용 예정)
      "no-mixed-operators": 0, // 혼합 연산자 허용
      "no-promise-executor-return": 1, // Promise executor에서 return 경고
      "no-multiple-empty-lines": 0, // 여러 줄 공백 허용
      "prefer-regex-literals": ["off"], // 정규식 리터럴 권장 끔
      "prefer-const": 1, // 변경되지 않는 변수는 const 사용 권장
      indent: ["error", 4], // 들여쓰기 4칸
      "prefer-destructuring": ["error", { object: false, array: false }], // 구조 분해 비권장
      radix: ["error", "as-needed"], // parseInt 등에서 radix 필요시만 사용
      "no-prototype-builtins": "error", // Object.prototype 메서드 직접 호출 금지
      "no-empty": ["error", { allowEmptyCatch: true }], // 빈 블록 금지, 단 catch는 예외
      camelcase: "off", // camelCase 강제 안 함
      "no-this-before-super": ["off"], // super 호출 전 this 사용 허용
      "no-useless-constructor": ["off"], // 의미 없는 생성자 허용
      "no-empty-function": [
        "error",
        { allow: ["constructors", "arrowFunctions"] }, // 빈 생성자 및 화살표 함수 허용
      ],
      "no-param-reassign": ["error", { props: false }], // 함수 매개변수 재할당은 허용, 단 속성은 제한
      "no-underscore-dangle": ["off"], // 변수명에 밑줄 허용
      "no-new": ["off"], // new 연산자 사용 제한 없음
      "prefer-template": ["error"], // 템플릿 리터럴 사용 권장
      "no-plusplus": ["off"], // ++, -- 연산자 사용 허용
      "no-tabs": ["off"], // 탭 문자 사용 허용
      "no-shadow": ["off"], // 변수 shadowing 허용
      "no-use-before-define": ["off"], // 정의 전 사용 허용

      // TypeScript 전용 규칙
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "no-public", // 명시적으로 public 표기 안 함
          overrides: {
            accessors: "no-public",
            methods: "no-public",
            properties: "no-public",
            parameterProperties: "explicit", // 생성자 파라미터 속성은 명시
          },
        },
      ],
      "@typescript-eslint/no-object-literal-type-assertion": ["off"], // 객체 리터럴 타입 단언 허용
      "@typescript-eslint/camelcase": ["off"], // camelCase 강제 안 함 (deprecated 규칙)
      "@typescript-eslint/naming-convention": [
        "off", // 네이밍 규칙 비활성화 (일부 예외 정의됨)
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          filter: {
            regex: "(total_count)",
            match: false, // total_count는 예외
          },
          leadingUnderscore: "allow",
        },
        {
          selector: "memberLike",
          format: ["camelCase", "snake_case", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase", "UPPER_CASE"],
        },
      ],
      "@typescript-eslint/no-empty-function": ["off"], // eslint 버전의 규칙 사용
      "@typescript-eslint/no-use-before-define": ["off"], // eslint 버전의 규칙 사용
      "@typescript-eslint/ban-ts-ignore": ["off"], // @ts-ignore 주석 허용
      "@typescript-eslint/explicit-function-return-type": ["off"], // 함수 반환 타입 명시 안 해도 됨
      "@typescript-eslint/explicit-module-boundary-types": ["off"], // 모듈 경계 반환 타입 생략 허용
      "@typescript-eslint/no-explicit-any": ["off"], // any 타입 사용 허용
      "@typescript-eslint/no-unused-vars": ["error"], // TS용 unused-vars 활성화
      "@typescript-eslint/no-shadow": ["error"], // 변수 shadowing 금지 (TS 기준)
      "@typescript-eslint/consistent-type-imports": ["error"], // import type 일관되게 사용
    },
  },
  js.configs.recommended, // ESLint의 기본 JavaScript 권장 규칙 포함
  ...tseslint.configs.recommended, // TypeScript ESLint 권장 규칙 추가 (strict/stylistic로 교체 가능)
];
