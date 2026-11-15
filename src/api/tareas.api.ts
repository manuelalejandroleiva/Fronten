import { api } from './api';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: 'pendiente' | 'en curso' | 'hecha';
  responsable: string;
}

export const tareasApi = {
  getAll: (estado?: string) => api.get<Tarea[]>(`/tareas${estado ? `?estado=${estado}` : ''}`),
  getById: (id: number) => api.get<Tarea>(`/tareas/${id}`),
  create: (data: Omit<Tarea, 'id'>) => api.post<Tarea>('/tareas', data),
  update: (id: number, data: Partial<Tarea>) => api.put<Tarea>(`/tareas/${id}`, data),
  cambiarEstado: (id: number, estado: string) => api.patch<Tarea>(`/tareas/${id}/estado`, { estado }),
  delete: (id: number) => api.delete<void>(`/tareas/${id}`),
};