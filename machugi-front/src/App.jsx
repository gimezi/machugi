import { Routes, Route } from "react-router-dom";
import Start from "./Pages/Start";
import Game from "./Pages/Game";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[800px] h-screen border-1">
        <Routes>
          <Route path="/" Component={Start} />
          <Route path="/game" Component={Game} />
          <Route path="*" element={<div>없는 페이지에요</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
