import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MonkeyType from "./component/MonkeyType";
import Result from "./component/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element=<MonkeyType /> />
        <Route path="result" element=<Result /> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
