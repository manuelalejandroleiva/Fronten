import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tareasApi } from '../api/tareas.api';

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', descripcion: '', responsable: '', estado: 'pendiente' });
  const input = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500";

  useEffect(() => { 
    tareasApi.getById(Number(id)).
    then(t => 
        setForm({ titulo: t.titulo, descripcion: t.descripcion || '', responsable: t.responsable, estado: t.estado })); },
         [id]);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    await tareasApi.update(Number(id), form);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <form onSubmit={enviar} className="bg-white rounded-3xl border p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl font-black">Editar Tarea #{id}</h1>
        <input className={input} value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
        <textarea className={input} rows={3} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
        <input className={input} value={form.responsable} onChange={e => setForm({ ...form, responsable: e.target.value })} required />
        <select className={input} value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
          <option value="pendiente">Pendiente</option>
          <option value="en curso">En curso</option>
          <option value="hecha">Hecha</option>
        </select>
        <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl">Guardar Cambios</button>
      </form>
    </div>
  );
}