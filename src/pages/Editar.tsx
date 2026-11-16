import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { tareasApi } from '../api/tareas.api';
import type { EstadoTarea } from '../types/tareas';


export default function Editar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [responsable, setResponsable] = useState('');
  const [estado, setEstado] = useState<EstadoTarea>('pendiente');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    if (!id) return;
    let cancelado = false;

    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const tarea = await tareasApi.getById(Number(id));
        if (!cancelado) {
          setTitulo(tarea.titulo);
          setResponsable(tarea.responsable);
          setEstado(tarea.estado);
        }
      } catch {
        if (!cancelado) setError('No se pudo cargar la tarea.');
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargar();
    return () => {
      cancelado = true;
    };
  }, [id, intentos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setGuardando(true);
    setError(null);
    try {
      await tareasApi.update(Number(id), {
        titulo: titulo.trim(),
        responsable: responsable.trim(),
        estado,
      });
      navigate('/');
    } catch {
      setError('No se pudo guardar los cambios. Inténtalo de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-slate-500">Cargando tarea...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Link to="/" className="text-sm text-indigo-600 font-bold">← Volver</Link>
        <h1 className="text-2xl font-bold text-slate-800 mt-2 mb-6">Editar tarea</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex justify-between items-center gap-4">
            <p className="text-sm text-red-700">😢 {error}</p>
            <button
              onClick={() => setIntentos((prev) => prev + 1)}
              className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shrink-0"
            >
              Reintentar
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-slate-600">Título *</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full mt-1 bg-slate-100 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-slate-600">Responsable *</label>
            <input
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
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
              <option value="en curso">En Curso</option>
              <option value="hecha">Hecha</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={guardando}
            className="bg-indigo-600 text-white py-2.5 rounded-lg font-bold disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}