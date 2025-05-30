/*
    MSW 핸들러 정보 타입 정의
*/
export type HandlerEnabledState = Record<string, boolean>;

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
      isWorkerRunning: () => boolean;
      help: () => void;
    };
  }
}
