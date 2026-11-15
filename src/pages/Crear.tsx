import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tareasApi } from '../api/tareas.api';

export default function Crear() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', descripcion: '', responsable: '', estado: 'pendiente' });
  const input = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition";

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    try { 
        await tareasApi.create(form as any); 
        navigate('/'); }
     catch (err: any) {
         alert(err.message); }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <form onSubmit={enviar} className="bg-white rounded-3xl border shadow-sm p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl font-black">Nueva Tarea</h1>
        <input className={input} placeholder="Título * ej: Arreglar Squid" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
        <textarea className={input} placeholder="Descripción..." rows={3} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
        <input className={input} placeholder="Responsable * ej: Juan" value={form.responsable} onChange={e => setForm({ ...form, responsable: e.target.value })} required />
        <select className={input} value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
          <option value="pendiente">Pendiente</option>
          <option value="en curso">En curso</option>
          <option value="hecha">Hecha</option>
        </select>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition">Crear Tarea →</button>
      </form>
    </div>
  );
}