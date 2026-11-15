export type EstadoTarea = 'pendiente' | 'en curso' | 'hecha';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  responsable: string;
  estado: EstadoTarea;
  creadoEn?: string;
}

export interface CrearTareaDTO {
  titulo: string;
  responsable: string;
  estado: EstadoTarea;
}