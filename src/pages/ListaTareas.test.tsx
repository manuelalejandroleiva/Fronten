import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { tareasApi } from '../api/tareas.api';

import Home from './Home';
import type { Tarea } from '../types/tareas';

vi.mock('../api/tareas.api', () => ({
  tareasApi: {
    getAll: vi.fn(),
  },
}));

const tareasMock: Tarea[] = [
  { id: 1, titulo: 'T1', estado: 'pendiente', responsable: 'Juan', descripcion: '' },
  { id: 2, titulo: 'T2', estado: 'hecha', responsable: 'Ana', descripcion: '' },
  { id: 3, titulo: 'T3', estado: 'pendiente', responsable: 'Pedro', descripcion: '' },
];

describe('ListaTareas - Filtrar por estado', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(tareasApi.getAll).mockImplementation(async (filtro?: string): Promise<Tarea[]> => {
      if (!filtro || filtro === 'Todas') return tareasMock;
      return tareasMock.filter((t) => t.estado.toLowerCase() === filtro.toLowerCase());
    });
  });

  it('debería mostrar solo las pendientes al filtrar', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText('T1')).toBeInTheDocument();
    expect(screen.getByText('T2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Pendiente' }));

    expect(await screen.findByText('T1')).toBeInTheDocument();
    expect(screen.queryByText('T2')).not.toBeInTheDocument();
    expect(screen.getByText('T3')).toBeInTheDocument();
  });
});