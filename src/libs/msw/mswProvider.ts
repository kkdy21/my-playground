import { type SetupWorker, setupWorker } from 'msw/browser';
import { mockHandlers } from './mswHandlers';

/**
 * MSW(Mock Service Worker) 설정 및 관리를 위한 클래스
 * 개발 환경에서 API 모킹을 제공합니다.
 */
class MSWProvider {
  private worker: SetupWorker | null = null;

  /**
   * MSW 워커를 초기화합니다.
   * 개발 환경에서만 활성화됩니다.
   */
  async start(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      try {
        this.worker = setupWorker(...mockHandlers);
        await this.worker.start({
          onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 무시
        });
        console.log('[MSW] Mocking enabled');
      } catch (error) {
        console.error('[MSW] Failed to initialize:', error);
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
      console.log('[MSW] Mocking disabled');
    }
  }

}

// 싱글톤 인스턴스 생성
export const mswProvider = new MSWProvider(); 