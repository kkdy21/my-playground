# 🔧 TypeScript 설정 (tsconfig)

## 📁 base.json

공통 TypeScript 설정으로, Node.js와 React 앱 모두에서 사용됩니다.

```javascript
{
  "esModuleInterop": true,                 // CommonJS 모듈을 ES 방식으로 import
  "skipLibCheck": true,                    // node_modules 타입 검사 생략
  "target": "ESNext",                      // 최신 JS 문법으로 컴파일
  "allowJs": true,                         // JS 파일도 컴파일 허용
  "resolveJsonModule": true,              // .json 파일 import 가능
  "moduleDetection": "force",             // 모든 파일을 모듈로 간주
  "isolatedModules": true,                // 파일별 독립 컴파일 (ESM 대응)
  "strict": true,                         // 엄격한 타입 검사
  "noUnusedLocals": true,                 // 사용되지 않는 지역 변수 에러
  "noUnusedParameters": true,             // 사용되지 않는 함수 파라미터 에러
  "noFallthroughCasesInSwitch": true,     // switch 문에서 fallthrough 방지
  "noUncheckedSideEffectImports": true,   // 부작용 있는 import 확인
  "forceConsistentCasingInFileNames": true, // 파일명 대소문자 일관성
  "lib": ["ESNext"]                       // 최신 JS 표준 라이브러리 사용
}
```

## 📁 node.json

Vite 설정 등 Node.js 환경용 설정입니다.

```javascript
{
  "extends": "./base.json",
  "module": "ESNext",                 // 최신 ESM 모듈 사용
  "moduleResolution": "bundler",     // 번들러 친화적인 모듈 해석
  "target": "ES2022",                // 최신 문법 사용 (예: top-level await)
  "lib": ["ES2023"],                 // 최신 표준 라이브러리
  "noEmit": true                     // 출력 파일 생성하지 않음
}
```

## 📁 react-app.json

React 애플리케이션 전용 설정입니다.

```javascript
{
  "extends": "./base.json",
  "lib": ["DOM", "DOM.Iterable", "ESNext"],  // DOM 관련 타입 포함
  "jsx": "react-jsx",                         // React 17+ JSX Transform 사용
  "module": "ESNext",
  "moduleResolution": "bundler",
  "allowImportingTsExtensions": true,        // .ts/.tsx 확장자 import 허용
  "noEmit": true,
  "baseUrl": ".",                            // import 절에서의 절대 경로 기준
  "paths": {
    "@/*": ["./src/*"]                       // @ 경로 별칭 설정
  },
  "include": ["src"]
}
```
