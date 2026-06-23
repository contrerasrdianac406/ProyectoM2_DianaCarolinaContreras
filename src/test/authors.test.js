// validators.test.js
import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../index.js';
import { validarEmail,esNum } from './validators.js';

// Mock del pool de PostgreSQL
vi.mock('../db/config.js', () => ({
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
    test('1.crea usuario con nombre y email válidos', async () => {
      const response = await request(app)
      .post('/authors')
      .send({ name: 'Carolina', email: 'Carolina@example.com' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Carolina');
      expect(response.body.email).toBe('Carolina@example.com');
  });

    // Test para validar que el nombre y correo no esten vacios
    test('2.rechaza request sin nombre y email', async () => {
      const response = await request(app)
      .post('/authors')
      .send({});

      expect(response.statusCode).toBe(400);
  });

    test('3.rechaza request sin email', async () => {
    const response = await request(app)
      .post('/authors')
      .send({ nombre: 'Juan' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('El nombre y el correo electrónico son obligatorios');
});
  
    test('4.validar formato email', async () => {
      const response = await request(app)
      .post('/authors')
      .send({name: 'Hugo', email: 'Hugo@.com'});

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain('El formato del email es inválido');

  });

    test('5.debe rechazar email sin @', () => {
      const email = 'testexample.com';
      const resultado = validarEmail(email);
      
      expect(resultado).not.toBe(null);
      expect(resultado).toContain('inválido');
  });

});

describe ('GET/authors', ()=>{
    test('1. validar que el Id sea correcto', async () => { 
      const num = 1;
      expect(esNum(num)).toBe(false);
    
    });

  });
  
