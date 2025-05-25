import { useEffect } from "react";
import "./App.css";
import { useGetMenu } from "./repositories/menuRepository/query/useMenu";

function App() {
  const { data } = useGetMenu();
  console.log(data);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("--- MSW 개발 모드 안내 ---");
      console.log(
        "개발자 콘솔에서 'mswControl' 객체를 사용하여 모킹 핸들러를 제어할 수 있습니다."
      );
      console.log("사용 예시:");
      console.log(
        "  mswControl.listHandlers()        - 모든 핸들러와 현재 상태 보기" 
      );
      console.log(
        "  mswControl.enableHandler('ID')   - 특정 ID의 핸들러 활성화"
      );
      console.log(
        "  mswControl.disableHandler('ID')  - 특정 ID의 핸들러 비활성화"
      );
      console.log("  mswControl.enableAllHandlers()   - 모든 핸들러 활성화");
      console.log("  mswControl.disableAllHandlers()  - 모든 핸들러 비활성화");
      console.log("  mswControl.getCurrentConfig()    - 현재 메모리 설정 보기");
      console.log(
        "  mswControl.saveConfigToLocalStorage() - 현재 설정을 localStorage에 저장"
      );
      console.log(
        "  mswControl.loadConfigFromLocalStorage() - localStorage에서 설정 로드 (주의: 현재 변경사항 덮어씀)"
      );
      console.log(
        "  mswControl.resetToInitialCodeConfig() - 코드 레벨 초기 설정으로 리셋"
      );
      console.log(
        "초기 핸들러 활성화 상태는 'src/libs/msw/mswConfig.ts'의 'initialHandlerStates' 객체에 정의되어 있습니다."
      );
      console.log(
        "런타임 변경 사항은 'mswControl.saveConfigToLocalStorage()' 호출 시 localStorage에 저장되어 세션 간 유지될 수 있습니다."
      );
    }
  }, []);
  return <></>;
}

export default App;
