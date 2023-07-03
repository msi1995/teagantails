import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from './components/Homepage';
import { Contact } from './components/Contact';
import { Testimonials } from "./components/Testimonials";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/testimonials" element={<Testimonials/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;