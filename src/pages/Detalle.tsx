import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tareasApi } from '../api/tareas.api';
import type { Tarea } from '../types/tareas';


export default function Detalle() {
  const { id } = useParams<{ id: string }>();
  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    if (!id) return;
    setCargando(true);
    setError(null);
    try {
      const data = await tareasApi.getById(Number(id));
      setTarea(data);
    } catch {
      setError('No se pudo cargar la tarea. Puede que no exista.');
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-slate-500">Cargando tarea...</p>
      </div>
    );
  }

  if (error || !tarea) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-xl mx-auto px-4 py-6">
          <Link to="/" className="text-sm text-indigo-600 font-bold">← Volver</Link>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mt-6 text-center">
            <p className="font-bold text-red-700">😢 {error ?? 'Tarea no encontrada'}</p>
            <button onClick={cargar} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Link to="/" className="text-sm text-indigo-600 font-bold">← Volver</Link>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold border bg-indigo-50 text-indigo-700 border-indigo-200">
            {tarea.estado}
          </span>
          <h1 className="text-2xl font-bold text-slate-800 mt-3">{tarea.titulo}</h1>
          {tarea.descripcion && <p className="text-slate-500 mt-2">{tarea.descripcion}</p>}
          <p className="text-sm text-slate-400 mt-4">👤 {tarea.responsable}</p>
          {tarea.creadoEn && (
            <p className="text-xs text-slate-400 mt-1">
              📅 {new Date(tarea.creadoEn).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
          <Link to={`/editar/${tarea.id}`} className="inline-block mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            Editar tarea
          </Link>
        </div>
      </div>
    </div>
  );
}