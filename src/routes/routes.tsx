import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Crear from "../pages/Crear";
import Editar from "../pages/Editar";
import Detalle from "../pages/Detalle";


export default function Routess() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/tarea/:id" element={<Detalle />} />
          <Route path="*" element={<div className="text-center py-20 text-2xl font-bold">404 - No encontrada</div>} />

        </Routes>
    )

}