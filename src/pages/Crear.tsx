import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { tareasApi } from '../api/tareas.api';

import type { EstadoTarea, Tarea } from '../types/tareas';

export default function Crear() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [responsable, setResponsable] = useState('');
  const [estado, setEstado] = useState<EstadoTarea>('pendiente');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !responsable.trim()) {
      setError('El título y el responsable son obligatorios.');
      return;
    }
    setGuardando(true);
    setError(null);
    try {
      await tareasApi.create({ titulo: titulo.trim(), responsable: responsable.trim(), estado } as Tarea);
      navigate('/');
    } catch {
      setError('No se pudo crear la tarea. Revisa que el backend esté corriendo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Link to="/" className="text-sm text-indigo-600 font-bold">← Volver</Link>
        <h1 className="text-2xl font-bold text-slate-800 mt-2 mb-6">Crear tarea</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-red-700">😢 {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-slate-600">Título *</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título * ej: Arreglar Squid"
              className="w-full mt-1 bg-slate-100 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Responsable *</label>
            <input
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              placeholder="Responsable * ej: Juan"
              className="w-full mt-1 bg-slate-100 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-600">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value as EstadoTarea)}
              className="w-full mt-1 bg-slate-100 rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en curso">En progreso</option>
              <option value="hecha">Hecha</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="bg-indigo-600 text-white py-2.5 rounded-lg font-bold disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : 'Crear tarea'}
          </button>
        </form>
      </div>
    </div>
  );
}