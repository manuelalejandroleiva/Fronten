import { useCallback, useEffect, useState } from 'react';
// ✅ BIEN
import { tareasApi } from '../api/tareas.api';
import type { Tarea } from '../api/tareas.api';
import TareaCard from '../components/TareaCard';

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      setTareas(await tareasApi.getAll(filtro || undefined));
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const filtros = [
    { label: 'Todas', value: '' },
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En Curso', value: 'en curso' },
    { label: 'Hecha', value: 'hecha' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">Mis Tareas</h1>
          <p className="text-slate-500 mt-1">{tareas.length} tareas • Gestiona tu equipo</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filtros.map(f => (
            <button key={f.value} onClick={() => setFiltro(f.value)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filtro === f.value ? 'bg-slate-900 text-white shadow' : 'bg-white border border-slate-200 hover:border-slate-400'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? <p className="text-center py-20 text-slate-400 animate-pulse">Cargando tareas...</p> :
        tareas.length === 0 ? <div className="bg-white border rounded-3xl p-12 text-center text-slate-400">No hay tareas. Crea la primera →</div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tareas.map(t => <TareaCard key={t.id} tarea={t} onChange={cargar} />)}
        </div>}
    </div>
  );
}