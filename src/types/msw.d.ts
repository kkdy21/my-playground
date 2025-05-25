/*
    MSW 핸들러 정보 타입 정의
*/

export interface MockHandlerInfo {
  groupName: string;
  id: string;
  description: string;
  isEnabled: boolean;
}

declare global {
  interface Window {
    mswControl?: {
      enableHandler: (handlerId: string) => Promise<void>;
      disableHandler: (handlerId: string) => Promise<void>;
      isHandlerEnabled: (handlerId: string) => boolean | undefined;
      listHandlers: () => void;
      enableAllHandlers: () => Promise<void>;
      disableAllHandlers: () => Promise<void>;
      getCurrentConfig: () => HandlerEnabledState;
      saveConfigToLocalStorage: () => Promise<void>;
      loadConfigFromLocalStorage: () => Promise<void>;
      resetToInitialCodeConfig: () => Promise<void>;
    };
  }
}

//FIXME 글로벌하게 사용하는 방법? d.ts 파일에 정의하는 것이 맞는지?
export interface MockHandlerItem {
  id: string;
  description: string;
  handler: RequestHandler;
}

export type HandlerEnabledState = Record<string, boolean>;
