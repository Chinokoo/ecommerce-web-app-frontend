import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-stone-600 to-stone-900 text-white relative overflow-hidden px-2 md:px-10">
      <div className="relate z-50 pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
