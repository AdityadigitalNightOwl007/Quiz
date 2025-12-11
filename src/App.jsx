import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        {/* Only one route → "/" */}
        <Route path="/" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
