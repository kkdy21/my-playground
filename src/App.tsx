import { useEffect } from "react";
import "./App.css";
import { useGetMenu } from "./repositories/menuRepository/query/useMenu";

function App() {
  const { data } = useGetMenu();
  console.log(data);

  useEffect(() => {
    window.mswControl?.help();
  }, []);

  return <></>;
}

export default App;
