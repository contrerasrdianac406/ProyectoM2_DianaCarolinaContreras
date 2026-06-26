// validators.test.js
import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../index.js';
import { validarEmail,esNum } from './validators.js';

// Mock del pool de PostgreSQL
vi.mock('../db/config.js', () => ({
  default: {
    query: vi.fn(async (sql, params) => {
    // 1. Mock para verificar si el email ya existe
      if (sql.includes('SELECT * FROM authors WHERE email')) {
        return { rows: [] }; // Email no existe
      }
    // 2. Mock para traer un autor por ID (SELECT * FROM authors WHERE id = $1)
      if (sql.includes('SELECT * FROM authors WHERE id =')) {
        const authorId = params ? params[0] : 1;
        // 🔽 AGREGA ESTA CONDICIÓN: Si el ID es 5, devolvemos filas vacías
        if (Number(authorId) === 5) {
          return { rows: [] }; 
        }
        
        return {
          rows: [{
            id: authorId,
            name: 'Autor Individual',
            email: 'autor@correo.com',
            bio: 'Biografía del autor',
            created_at: '2026-06-20T12:00:00.000Z'
          }]
        };
      }
    // 3. Mock para traer TODOS los autores ordenados desc (SELECT * FROM authors ORDER BY...)
      if (sql.includes('SELECT * FROM authors ORDER BY')) {
        return {
          rows: [
            {
              id: 2,
              name: 'Segundo Autor (Más reciente)',
              email: 'autor2@correo.com',
              bio: 'Bio 2',
              created_at: '2026-06-21T15:00:00.000Z'
            },
            {
              id: 1,
              name: 'Primer Autor (Más antiguo)',
              email: 'autor1@correo.com',
              bio: 'Bio 1',
              created_at: '2026-06-20T12:00:00.000Z'
            }
          ]
        };
      }  
      
    // 4. Mock para INSERT - crear autor
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

      5.// Mock para UPDATE - actualizar autor
        if (sql.includes('UPDATE authors')) {
          // Tomamos los parámetros que envías en la consulta SQL
          // Dependiendo de tu consulta, el orden suele ser: [name, email, id] o [name, email, bio, id]
          const [name, email] = params; 
          
          return {
            rows: [{
              id: 1, // Simulamos que actualizó el ID 1
              name,
              email,
              bio: 'Biografía',
              created_at: '2026-06-20T12:00:00.000Z'
            }]
          };
        }

        // Mock para DELETE - eliminar autor
        if (sql.includes('DELETE FROM authors')) {
          const authorId = params ? params[0] : null;

          // Como tu test busca eliminar el ID 5 y esperas un 404, 
          // simulamos que el ID 5 NO existe en la base de datos devolviendo rowCount: 0
          if (Number(authorId) === 5) {
            return { rows: [], rowCount: 0 }; 
          }
        }
      
      // Mock para otros queries
      return { rows: [] };
    })
  }
}));

describe ('POST/authors', ()=>{
    // test crea usuario con nombre y email válido
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
      expect(response.body.error).toContain('El nombre y el correo electrónico son obligatorios');
  });
    // test para rechazar un request sin email
    test('3.rechaza request sin email', async () => {
      const response = await request(app)
      .post('/authors')
      .send({ nombre: 'Juan' });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain('El nombre y el correo electrónico son obligatorios');
});

    test('4.rechaza request sin nombre', async () => {
    const response = await request(app)
      .post('/authors')
      .send({ email: 'Juan@gmail.com' });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain('El nombre y el correo electrónico son obligatorios');
  });

});

describe ('GET/authors', ()=>{
    //Test validar que el Id sea un número
    test('5. validar que el Id sea un número', async () => { 
      const num = 1;
      expect(esNum(num)).toBe(false);
    });
    //Test para obtener todos los autores
    test('6. validar que se consulten todos los autores', async ()=>{
        const response = await request (app)
        .get('/authors');

        expect(response.statusCode).toBe(200);
      });

  });
  
describe('GET/authors/id', ()=> {
     // test para obtener un autor por id
    test('7.obtener un autor por id', async () =>{
      const response = await request (app)
      .get('/authors/1')
      expect(response.statusCode).toBe(200);
    });

    // test para autor no existente por id
    test('8.validar un autor no existente por id', async () =>{
      const response = await request (app)
      .get('/authors/5')
      expect(response.statusCode).toBe(404);
    });

    // test para validar que el id es invalido corresponde a una letra
    test('9.validar un autor cuando el id es invalido es una letra', async () =>{
      const response = await request (app)
      .get('/authors/a')
      expect(response.statusCode).toBe(400);
    });

    // test para validar que el id es invalido corresponde a un  número negativo
    test('10.validar un autor cuando el id es invalido es un número negativo', async () =>{
      const response = await request (app)
      .get('/authors/-1')
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain('El ID debe ser un número positivo');
    });


});

describe('PUT/authors/id', ()=> {
    //Actualización de un autor
    test('11.actualizar un autor existente correctamente', async () =>{
      const response = await request(app)
      .put('/authors/1')
      .send({id:1, name: 'Carolina Actualizado', email: 'Carolinanuevo@example.com'});

      expect(response.statusCode).toBe(200);
      // 3. Verificaciones del contenido actualizado
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Carolina Actualizado');
      expect(response.body.email).toBe('Carolinanuevo@example.com');
    });
    // Test para validar que el nombre y correo no esten vacios para actualizar
    test('12.rechaza request sin nombre y email', async () => {
      const response = await request(app)
      .put('/authors/1')
      .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain('El nombre y el correo electrónico son obligatorios');
  });
      // actualizar un autor que no existe 
    test('13.actualizar un autor no existente por id', async () =>{
      const response = await request (app)
      .put('/authors/5')
      .send({id:5, name: 'Carolina Actualizado', email: 'Carolinanuevo@example.com'});
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toContain('Autor no encontrado');
});

    // test para validar que el id es invalido corresponde a una letra
    test('14.validar un autor cuando el id es invalido es una letra', async () =>{
      const response = await request (app)
      .put('/authors/a')
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain('El ID debe ser un número válido');
    });

    // test para validar que el id es invalido corresponde a un  número negativo
    test('15.validar un autor cuando el id es invalido numero negativo', async () =>{
      const response = await request (app)
      .put('/authors/-1')
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toContain('El ID debe ser un número válido');
    });

});

describe ('DELETE/authors', ()=>{
    //Test para eliminar un autor por id
    test('16. eliminar un autor por id', async ()=>{
        const response = await request (app)
        .delete('/authors/1');

        expect(response.statusCode).toBe(200);
      });

    test('17.validar un autor cuando el id es invalido es una letra', async () =>{
      const response = await request (app)
      .delete('/authors/a')
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain('El id debe ser un número ');
    });

    // test para validar que el id es invalido corresponde a un  número negativo
    test('18.validar un autor cuando el id es invalido numero negativo', async () =>{
      const response = await request (app)
      .delete('/authors/-1')
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toContain('El id debe ser un número válido');
    });

    // test para autor no existente por id
    test('19.validar un autor no existente por id', async () =>{
      const response = await request (app)
      .delete('/authors/5')
      expect(response.statusCode).toBe(404);
    });

  });
  