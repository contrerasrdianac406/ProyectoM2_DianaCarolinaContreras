// validators.test.js
import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../index';

// Mock del pool de PostgreSQL
vi.mock('../db/config', () => ({
  default: {
    query: vi.fn(async (sql, params) => {
      // Mock para verificar si el email ya existe
      if (sql.includes('SELECT * FROM authors WHERE email')) {
        return { rows: [] }; // Email no existe
      }
      
      // Mock para INSERT - crear autor
      if (sql.includes('INSERT INTO authors')) {
        const [name, email, bio] = params;
        return {
          rows: [{
            id: 2,
            name,
            email,
            bio: bio || '',
            created_at: '2026-06-20T12:00:00.000Z'
          }]
        };
      }
      
      // Mock para otros queries
      return { rows: [] };
    })
  }
}));

describe ('POST/authors', ()=>{
    test('crea usuario con datos válidos', async () => {
    const response = await request(app)
      .post('/authors')
      .send({ name: 'el tigre abelardo', email: 'el_tigre@example.com' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('el tigre abelardo');
    expect(response.body.email).toBe('el_tigre@example.com');
  });
})
