import { type SetupWorker, setupWorker } from "msw/browser";
import {
  getConfiguredRequestHandlers,
  initializeMSWRuntimeConfig,
} from "./mswConfig";

/**
 * MSW(Mock Service Worker) 설정 및 관리를 위한 클래스
 * 개발 환경에서 API 모킹을 제공합니다.
 */
class MSWProvider {
  private worker: SetupWorker | null = null;
  private configInitializationEnsured = false; // config 초기화 호출 보장 플래그

  private async ensureConfigInitialized(): Promise<void> {
    if (
      !this.configInitializationEnsured &&
      process.env.NODE_ENV === "development"
    ) {
      initializeMSWRuntimeConfig(); // 이 함수는 내부적으로 configInitialized 플래그를 사용하므로 여러 번 호출해도 안전
      this.configInitializationEnsured = true;
    }
  }

  /**
   * MSW 워커를 초기화합니다.
   * 개발 환경에서만 활성화됩니다.
   */
  async start(): Promise<void> {
    if (this.worker) {
      return;
    }

    if (process.env.NODE_ENV === "development") {
      await this.ensureConfigInitialized();
      const activeHandlers = getConfiguredRequestHandlers();

      if (activeHandlers.length === 0) {
        console.log(
          "[MSW] 활성화된 핸들러가 없습니다. MSW를 시작하지 않습니다."
        );
        this.worker = null;
        if (window.mswControl) {
          // 콘솔 명령어가 로드된 후라면 listHandlers 호출
          console.log(
            "[MSW Control] 'mswControl.enableHandler(\"핸들러ID\")' 또는 'mswControl.enableAllHandlers()'로 핸들러를 활성화할 수 있습니다."
          );
        }
        return;
      }

      try {
        this.worker = setupWorker(...activeHandlers);
        await this.worker.start({
          onUnhandledRequest: "bypass", // 처리되지 않은 요청은 무시
        });

        console.log("[MSW] 워커 시작됨 (핸들러 상세 정보 로드 전).");
      } catch (error) {
        console.error("[MSW] MSW 워커 초기화 실패:", error);
        this.worker = null;
      }
    }
  }

  /**
   * MSW 워커를 중지합니다.
   */
  async stop(): Promise<void> {
    if (this.worker) {
      await this.worker.stop();
      this.worker = null;
      console.log("[MSW] Mocking disabled");
    }
  }

  async reinitialize(): Promise<void> {
    await this.stop();
    await this.start();
  }
}

// 싱글톤 인스턴스 생성
export const mswProvider = new MSWProvider();
