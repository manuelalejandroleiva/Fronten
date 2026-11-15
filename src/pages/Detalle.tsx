import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// ✅ BIEN
import { tareasApi } from '../api/tareas.api';
import type { Tarea } from '../api/tareas.api';

export default function Detalle() {
  const { id } = useParams();
  const [tarea, setTarea] = useState<Tarea | null>(null);

  useEffect(() => { tareasApi.getById(Number(id)).then(setTarea); }, [id]);
  if (!tarea) return <p className="text-center py-20">Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-indigo-600 font-semibold">← Volver</Link>
      <div className="bg-white rounded-3xl border p-8 mt-4">
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{tarea.estado}</span>
        <h1 className="text-3xl font-black mt-4">{tarea.titulo}</h1>
        <p className="text-slate-500 mt-3">{tarea.descripcion || 'Sin descripción'}</p>
        <p className="mt-6 font-semibold">Responsable: <span className="text-slate-500">{tarea.responsable}</span></p>
        <p className="text-sm text-slate-400">ID: {tarea.id}</p>
      </div>
    </div>
  );
}