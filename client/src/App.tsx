import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from './components/Homepage';
import { Contact } from './components/Contact';
import { Testimonials } from "./components/Testimonials";
import { PageNotFound } from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/testimonials" element={<Testimonials/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/404" element={<PageNotFound/>} />
        <Route path="*" element={<Navigate to="/404"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
