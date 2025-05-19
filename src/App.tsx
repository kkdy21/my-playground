import { useEffect } from "react";
import "./App.css";
import { initMSW } from "@/msw/bootstrap";
import { useGetMenu } from "./repositories/menuRepository/query/useMenu";

function App() {
  useEffect(() => {
    initMSW();
  }, []);
  const { data } = useGetMenu();
  console.log(data);
  return <></>;
}

export default App;
