import customConfig from "@dy/eslint-config-custom";

export default [
  ...customConfig,
  // main-app에만 특화된 규칙이 있다면 여기에 추가
  // 예:
  // {
  //   files: ["src/특정파일.ts"],
  //   rules: { "no-console": "error" }
  // }
];