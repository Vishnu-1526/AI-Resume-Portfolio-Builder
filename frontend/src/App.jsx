import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Builder from './pages/Builder.jsx';
import Preview from './pages/Preview.jsx';
import Portfolio from './pages/Portfolio.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
      </Routes>
    </div>
  );
}
