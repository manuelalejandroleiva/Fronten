import { Link } from 'react-router-dom';
import type { EstadoTarea, Tarea } from '../types/tareas';


interface TareaCardProps {
  tarea: Tarea;
  onCambiarEstado: (id: number, estado: EstadoTarea) => void;
  onEliminar: (id: number) => void;
}

const ESTILOS_ESTADO: Record<EstadoTarea, string> = {
  pendiente: 'bg-amber-100 text-amber-800 border-amber-200',
  'en curso': 'bg-blue-100 text-blue-800 border-blue-200',
  hecha: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function TareaCard({ tarea, onCambiarEstado, onEliminar }: TareaCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex justify-between gap-3">
        <Link
          to={`/tarea/${tarea.id}`}
          className="font-bold text-lg text-slate-800 hover:text-indigo-600 leading-tight"
        >
          {tarea.titulo}
        </Link>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border h-fit whitespace-nowrap ${ESTILOS_ESTADO[tarea.estado]}`}>
          {tarea.estado}
        </span>
      </div>

      {tarea.descripcion && (
        <p className="text-sm text-slate-500 mt-2 line-clamp-2">{tarea.descripcion}</p>
      )}

      <p className="text-sm text-slate-400 mt-3">👤 {tarea.responsable}</p>

      {tarea.creadoEn && (
        <p className="text-xs text-slate-400 mt-1">
          📅 {new Date(tarea.creadoEn).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      )}

      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
        <select
          value={tarea.estado}
          onChange={(e) => onCambiarEstado(tarea.id, e.target.value as EstadoTarea)}
          className="flex-1 bg-slate-100 rounded-lg px-3 py-2 text-sm font-medium outline-none cursor-pointer"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en curso">En progreso</option>
          <option value="hecha">Hecha</option>
        </select>

        <Link
          to={`/editar/${tarea.id}`}
          className="bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg text-sm font-bold"
        >
          Editar
        </Link>

        <button
          onClick={() => onEliminar(tarea.id)}
          className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-bold hover:bg-red-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}