import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Result from "./pages/Result";
import CaraKerja from "./pages/CaraKerja";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/result" element={<Result />} />
      <Route path="/cara-kerja" element={<CaraKerja />} />
    </Routes>
  );
}

export default App;
