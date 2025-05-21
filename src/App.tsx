import "./App.css";
import { useGetMenu } from "./repositories/menuRepository/query/useMenu";

function App() {
  const { data } = useGetMenu();
  console.log(data);
  return <></>;
}

export default App;
