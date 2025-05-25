//개별 핸들러 ID 기반으로 설정을 관리하고, 콘솔용 함수들을 노출합니다.

import type { RequestHandler } from "msw";
import { localStorageAccessor, STORAGE_KEYS } from "../webStorage";
import { allMockHandlerInfoGroups } from "./mswHandlers";
import type { HandlerEnabledState, MockHandlerInfo } from "@/types/msw";
import { mswProvider } from "./mswProvider";
import { BOOKMARK_HANDLER_IDS } from "@/repositories/bookmarkRepository/mock/bookmarkMockhandler";
import { MENU_HANDLER_IDS } from "@/repositories/menuRepository/mock/menuMockhandler";

//이 객체가 실질적인 "Source of truth"
const initialHandlerStates: HandlerEnabledState = {
  [BOOKMARK_HANDLER_IDS.GET_BOOKMARK_BY_ID]: true,
  [BOOKMARK_HANDLER_IDS.CREATE_BOOKMARK]: true,
  [BOOKMARK_HANDLER_IDS.UPDATE_BOOKMARK]: true,
  [BOOKMARK_HANDLER_IDS.DELETE_BOOKMARK]: true,
  [BOOKMARK_HANDLER_IDS.GET_BOOKMARKS]: true,
  [MENU_HANDLER_IDS.GET_MENU_LIST]: true,
};

let runtimeHandlerConfig: HandlerEnabledState = { ...initialHandlerStates };
let configInitialized = false;

export function initializeMSWRuntimeConfig() {
  if (configInitialized || process.env.NODE_ENV !== "development") {
    return;
  }

  const storedConfig = localStorageAccessor.getItem<string>(
    STORAGE_KEYS.MSW_HANDLER_CONFIG
  );

  if (storedConfig) {
    try {
      const parsedConfig = JSON.parse(storedConfig) as HandlerEnabledState;
      // 저장된 설정과 코드 레벨의 초기 설정을 병합 (새로 추가된 핸들러 ID 고려)
      Object.keys(initialHandlerStates).forEach((id) => {
        if (typeof parsedConfig[id] === "boolean") {
          runtimeHandlerConfig[id] = parsedConfig[id];
        } else {
          runtimeHandlerConfig[id] = initialHandlerStates[id]; // 코드에 새로 추가된 핸들러는 초기값 사용
        }
      });
      console.log(
        "[MSW Config] localStorage에서 런타임 설정을 로드했습니다:",
        runtimeHandlerConfig
      );
    } catch (e) {
      console.warn(
        "[MSW Config] localStorage 설정 파싱 실패. 코드 레벨 초기값을 사용합니다.",
        e
      );
      runtimeHandlerConfig = { ...initialHandlerStates };
    }
  } else {
    runtimeHandlerConfig = { ...initialHandlerStates };
    console.log(
      "[MSW Config] 코드 레벨 초기값으로 런타임 설정을 초기화했습니다:",
      runtimeHandlerConfig
    );
  }
  configInitialized = true;
}

export function isMSWHandlerEnabled(handlerId: string): boolean {
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  if (!configInitialized) {
    return initialHandlerStates[handlerId] === undefined
      ? true
      : initialHandlerStates[handlerId]; // 초기화 전이면 코드의 기본값 사용
  }
  return typeof runtimeHandlerConfig[handlerId] === "boolean"
    ? runtimeHandlerConfig[handlerId]
    : initialHandlerStates[handlerId]; // 기본값: 활성화
}

export function setMSWHandlerEnabled(
  handlerId: string,
  enabled: boolean
): void {
  if (process.env.NODE_ENV === "development") {
    if (!configInitialized) {
      console.warn(
        "[MSW Config] 아직 초기화되지 않아 설정을 변경할 수 없습니다. 먼저 초기화하세요."
      );
      return;
    }
    if (Object.prototype.hasOwnProperty.call(runtimeHandlerConfig, handlerId)) {
      runtimeHandlerConfig[handlerId] = enabled;
      // 변경된 설정을 localStorage에 저장하여 세션 간 유지
      localStorageAccessor.setItem(
        STORAGE_KEYS.MSW_HANDLER_CONFIG,
        JSON.stringify(runtimeHandlerConfig)
      );
    } else {
      console.warn(
        `[MSW Config] 알 수 없는 핸들러 ID '${handlerId}'의 상태를 변경할 수 없습니다.`
      );
    }
  }
}

export function getConfiguredRequestHandlers(): RequestHandler[] {
  const activeRequestHandlers: RequestHandler[] = [];
  if (process.env.NODE_ENV !== "development") return activeRequestHandlers;
  if (!configInitialized) {
    // 초기화 전이면, 모든 핸들러를 코드의 initialHandlerStates 기준으로 반환하거나 빈 배열 반환
    // 여기서는 안전하게 빈 배열을 반환하고, 초기화 후 mswProvider가 재시작하도록 유도
    console.warn(
      "[MSW Config] 아직 초기화되지 않아 핸들러 목록을 가져올 수 없습니다."
    );
    return [];
  }

  Object.values(allMockHandlerInfoGroups).forEach((apiGroupHandlers) => {
    Object.values(apiGroupHandlers).forEach((handlerInfo) => {
      if (isMSWHandlerEnabled(handlerInfo.id)) {
        activeRequestHandlers.push(handlerInfo.handler);
      }
    });
  });
  return activeRequestHandlers;
}
// 콘솔에서 핸들러 목록을 보여주기 위한 내부 헬퍼 함수
function _getAllHandlerDetailsForConsole(): MockHandlerInfo[] {
  const details: MockHandlerInfo[] = [];
  if (process.env.NODE_ENV !== "development") return details;

  const sourceConfig = configInitialized
    ? runtimeHandlerConfig
    : initialHandlerStates;

  Object.entries(allMockHandlerInfoGroups).forEach(([groupName, handlers]) => {
    Object.values(handlers).forEach((handlerInfo) => {
      details.push({
        groupName,
        id: handlerInfo.id,
        description: handlerInfo.description,
        isEnabled:
          typeof sourceConfig[handlerInfo.id] === "boolean"
            ? sourceConfig[handlerInfo.id]
            : initialHandlerStates[handlerInfo.id] || false, // sourceConfig에 없으면 initial, 거기에도 없으면 false
      });
    });
  });
  return details.sort((a, b) => {
    // 그룹명 우선, 그 다음 설명으로 정렬
    if (a.groupName !== b.groupName) {
      return a.groupName.localeCompare(b.groupName);
    }
    return a.description.localeCompare(b.description);
  });
}

// --- 개발 환경에서만 콘솔에서 사용할 수 있도록 전역 함수를 노출 ---
if (process.env.NODE_ENV === "development") {
  const mswControlObject = {
    enableHandler: async (handlerId: string) => {
      if (!configInitialized) {
        console.warn(
          "[MSW Control] 설정이 초기화되지 않았습니다. 먼저 `initializeMswRuntimeConfig()`가 호출되어야 합니다."
        );
        return;
      }
      const handlerInfo = _getAllHandlerDetailsForConsole().find(
        (d) => d.id === handlerId
      );
      if (!handlerInfo) {
        console.warn(
          `[MSW Control] 핸들러 ID '${handlerId}'를 찾을 수 없습니다. 'mswControl.listHandlers()'로 확인하세요.`
        );
        return;
      }
      setMSWHandlerEnabled(handlerId, true);
      console.log(
        `[MSW Control] 핸들러 '${handlerInfo.description}' (ID: ${handlerId}) 활성화됨. MSW 재초기화 중...`
      );
      await mswProvider.reinitialize();
      console.log(`[MSW Control] MSW 재초기화 완료.`);
    },
    /** 특정 핸들러 모킹 비활성화 */
    disableHandler: async (handlerId: string) => {
      if (!configInitialized) {
        console.warn("[MSW Control] 설정이 초기화되지 않았습니다.");
        return;
      }
      const handlerInfo = _getAllHandlerDetailsForConsole().find(
        (d) => d.id === handlerId
      );
      if (!handlerInfo) {
        console.warn(
          `[MSW Control] 핸들러 ID '${handlerId}'를 찾을 수 없습니다.`
        );
        return;
      }
      setMSWHandlerEnabled(handlerId, false);
      console.log(
        `[MSW Control] 핸들러 '${handlerInfo.description}' (ID: ${handlerId}) 비활성화됨. MSW 재초기화 중...`
      );
      await mswProvider.reinitialize();
      console.log(`[MSW Control] MSW 재초기화 완료.`);
    },
    /** 특정 핸들러 현재 상태 확인 */
    isHandlerEnabled: (handlerId: string) => {
      if (!configInitialized) {
        console.warn("[MSW Control] 설정이 초기화되지 않았습니다.");
        // localStorage 직접 조회는 삭제 (initializeMswRuntimeConfig가 담당)
        return undefined;
      }
      const handlerInfo = _getAllHandlerDetailsForConsole().find(
        (d) => d.id === handlerId
      );
      if (!handlerInfo) {
        console.warn(
          `[MSW Control] 핸들러 ID '${handlerId}'를 찾을 수 없습니다.`
        );
        return undefined;
      }
      const enabled = isMSWHandlerEnabled(handlerId);
      console.log(
        `[MSW Control] 핸들러 '${
          handlerInfo.description
        }' (ID: ${handlerId}) 상태: ${enabled ? "활성화됨" : "비활성화됨"}`
      );
      return enabled;
    },
    /** 사용 가능한 모든 핸들러 목록 및 상태 출력 */
    listHandlers: () => {
      if (!configInitialized) {
        console.warn(
          "[MSW Control] 설정이 초기화되지 않았습니다. `initializeMswRuntimeConfig()`가 호출된 후 사용 가능합니다."
        );
        console.log("[MSW Control] 코드 레벨 기본 설정:", initialHandlerStates);
        return;
      }
      console.log("[MSW Control] 사용 가능한 핸들러 목록 (ID | 상태 | 설명):");
      const details = _getAllHandlerDetailsForConsole();
      if (details.length === 0) {
        console.log(
          "  (표시할 핸들러가 없거나, allMockHandlerInfoGroups가 비어있습니다.)"
        ); //
        return;
      }
      details.forEach((detail) => {
        console.log(
          `  - ${detail.id.padEnd(15, " ")} | ${
            detail.isEnabled ? "ON " : "OFF"
          } | ${detail.description} (그룹: ${detail.groupName})`
        );
      });
    },

    /** 모든 핸들러 활성화 */
    enableAllHandlers: async () => {
      if (!configInitialized) {
        console.warn("[MSW Control] 설정이 초기화되지 않았습니다.");
        return;
      }
      console.log("[MSW Control] 모든 핸들러 활성화 중...");
      Object.keys(runtimeHandlerConfig).forEach((id) =>
        setMSWHandlerEnabled(id, true)
      );
      await mswProvider.reinitialize();
      console.log("[MSW Control] 모든 핸들러 활성화 및 MSW 재초기화 완료.");
    },

    /** 모든 핸들러 비활성화 */
    disableAllHandlers: async () => {
      if (!configInitialized) {
        console.warn("[MSW Control] 설정이 초기화되지 않았습니다.");
        return;
      }
      console.log("[MSW Control] 모든 핸들러 비활성화 중...");
      Object.keys(runtimeHandlerConfig).forEach((id) =>
        setMSWHandlerEnabled(id, false)
      );
      await mswProvider.reinitialize();
      console.log("[MSW Control] 모든 핸들러 비활성화 및 MSW 재초기화 완료.");
    },

    /** 현재 런타임 설정을 콘솔에 출력 (runtimeHandlerConfig) */
    getCurrentConfig: () => {
      if (!configInitialized) {
        console.warn("[MSW Control] 설정이 초기화되지 않았습니다.");
        return { ...initialHandlerStates };
      }
      console.log(
        "[MSW Control] 현재 적용된 핸들러 설정 (메모리 기준):",
        runtimeHandlerConfig
      );
      return { ...runtimeHandlerConfig };
    },

    /** 현재 런타임 설정을 localStorage에 강제 저장 */
    saveConfigToLocalStorage: async () => {
      if (!configInitialized) {
        console.warn(
          "[MSW Control] 설정이 초기화되지 않아 localStorage에 저장할 수 없습니다."
        );
        return;
      }
      await localStorageAccessor.setItem(
        STORAGE_KEYS.MSW_HANDLER_CONFIG,
        JSON.stringify(runtimeHandlerConfig)
      );
      console.log(
        "[MSW Control] 현재 핸들러 설정을 localStorage에 저장했습니다.",
        runtimeHandlerConfig
      );
    },

    /** localStorage에서 설정을 다시 로드 (주의: 현재 메모리 변경사항 유실) */
    loadConfigFromLocalStorage: async () => {
      if (process.env.NODE_ENV !== "development") return;
      console.log("[MSW Control] localStorage에서 설정 재로드 시도 중...");
      configInitialized = false; // 강제 재로드 플래그
      initializeMSWRuntimeConfig(); // localStorage 우선 로드 로직 실행
      console.log(
        "[MSW Control] 설정 재로드 완료. 'mswControl.listHandlers()'로 확인하세요."
      );
      await mswProvider.reinitialize(); // 변경된 설정으로 MSW 워커 재시작
    },

    /** 코드 레벨의 초기 설정(initialHandlerStates)으로 현재 설정을 리셋 */
    resetToInitialCodeConfig: async () => {
      if (process.env.NODE_ENV !== "development") return;
      console.log("[MSW Control] 코드 레벨 초기 설정으로 리셋 중...");
      runtimeHandlerConfig = { ...initialHandlerStates };
      localStorageAccessor.setItem(
        STORAGE_KEYS.MSW_HANDLER_CONFIG,
        JSON.stringify(runtimeHandlerConfig)
      ); // localStorage도 업데이트
      configInitialized = true; // 이미 초기화된 것으로 간주
      console.log(
        "[MSW Control] 코드 레벨 초기 설정으로 리셋 완료:",
        runtimeHandlerConfig
      );
      await mswProvider.reinitialize();
    },
  };
  window.mswControl = mswControlObject;
  console.log(
    "[MSW Control] 콘솔에서 'mswControl.listHandlers()'를 입력하여 사용 가능한 핸들러를 확인하세요."
  );
}
