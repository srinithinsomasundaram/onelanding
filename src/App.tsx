import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./routes/index";
import TermsPage from "./routes/terms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
