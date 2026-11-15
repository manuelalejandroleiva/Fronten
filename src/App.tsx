import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Crear from './pages/Crear';
import Editar from './pages/Editar';
import Detalle from './pages/Detalle';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/tarea/:id" element={<Detalle />} />
          <Route path="*" element={<div className="text-center py-20 text-2xl font-bold">404 - No encontrada</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}