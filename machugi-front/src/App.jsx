import { Routes, Route } from "react-router-dom";
import Start from "./Pages/Start";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Start} />
        <Route path="*" element={<div>없는 페이지에요</div>} />
      </Routes>
    </div>
  );
}

export default App;
