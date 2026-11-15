import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TareaCard from '../components/TareaCard';
import { tareasApi } from '../api/tareas.api';
import type { EstadoTarea, Tarea } from '../types/tareas';


const FILTROS = ['Todas', 'pendiente', 'en curso', 'hecha'] as const;

export default function ListaTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filtro, setFiltro] = useState<string>('Todas');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await tareasApi.getAll(filtro === 'Todas' ? undefined : filtro);
      setTareas(data);
    } catch {
      setError('No se pudieron cargar las tareas. Revisa que el backend esté corriendo.');
    } finally {
      setCargando(false);
    }
  }, [filtro]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const cambiarEstado = async (id: number, estado: EstadoTarea) => {
    try {
      await tareasApi.cambiarEstado(id, estado);
      setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, estado } : t)));
    } catch {
      setError('No se pudo cambiar el estado. Inténtalo de nuevo.');
    }
  };

  const eliminar = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta tarea?')) return;
    try {
      await tareasApi.delete(id);
      setTareas((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('No se pudo eliminar la tarea. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Mis Tareas</h1>
          <Link
            to="/crear"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold text-center"
          >
            + Nueva tarea
          </Link>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTROS.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${
                filtro === f ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex justify-between items-center gap-4">
            <p className="text-sm text-red-700">😢 {error}</p>
            <button
              onClick={cargar}
              className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shrink-0"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* CARGANDO / VACÍO / LISTA */}
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-slate-500">Cargando tareas...</p>
          </div>
        ) : tareas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl">📭</p>
            <p className="font-bold text-slate-700 mt-2">No hay tareas en {filtro}</p>
            <p className="text-sm text-slate-400">Crea la primera tarea arriba</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tareas.map((tarea) => (
              <TareaCard
                key={tarea.id}
                tarea={tarea}
                onCambiarEstado={cambiarEstado}
                onEliminar={eliminar}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}