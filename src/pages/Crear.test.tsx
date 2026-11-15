import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Crear from './Crear';
import { tareasApi } from '../api/tareas.api';

vi.mock('../api/tareas.api', () => ({
  tareasApi: {
    create: vi.fn(),
  },
}));

describe('CrearTarea - Frontend', () => {
  it('debería crear una tarea cuando se llena el formulario', async () => {
    const user = userEvent.setup();
    const mockedCreate = vi.mocked(tareasApi.create);
    mockedCreate.mockResolvedValue({ id: 1, titulo: 'Arreglar Squid', responsable: 'Juan', estado: 'pendiente' } as any);

    render(
      <MemoryRouter>
        <Crear />
      </MemoryRouter>
    );

    // OJO: con acento en Título, como está en tu Crear.tsx
    await user.type(screen.getByPlaceholderText(/título/i), 'Arreglar Squid');
    await user.type(screen.getByPlaceholderText(/responsable/i), 'Juan');
    await user.click(screen.getByRole('button', { name: /crear tarea/i }));

    expect(mockedCreate).toHaveBeenCalledWith(
      expect.objectContaining({ titulo: 'Arreglar Squid', responsable: 'Juan' })
    );
  });

  it('no debería enviar si falta el titulo', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Crear />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /crear tarea/i }));

    expect(tareasApi.create).not.toHaveBeenCalled();
  });
});