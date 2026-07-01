// validators.test.js
import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../index.js';
import { validarEmail,esNum } from './validators.js';

// Mock del pool de PostgreSQL
vi.mock('../db/config.js', () => ({
    default: {
        query: vi.fn(async (sql, params) => {
        if (sql.includes('SELECT * FROM authors WHERE id =')) {
            const authorId = params ? params[0] : 1;
            if (Number(authorId) === 5) {
            return { rows: [] };
            }

            return {
            rows: [{
                id: authorId,
                name: 'Autor de prueba',
                email: 'autor@example.com',
                bio: 'Biografía de prueba',
                created_at: '2026-06-30T12:00:00.000Z'
            }]
            };
        }

        if (sql.includes('SELECT * FROM posts WHERE id =')) {
            const postId = params ? params[0] : 1;
            if (Number(postId) === 5) {
            return { rows: [] };
            }

            return {
            rows: [{
                id: postId,
                title: 'Autor personal',
                content: ' publicación Autor personal ',
                author_id: 1,
                published: true,
                created_at: '2026-06-30T12:00:00.000Z'
            }]
            };
        }
        // 3. Mock para traer TODOS los posts ordenados desc (SELECT * FROM authors ORDER BY...)
        if (sql.includes('SELECT * FROM posts ORDER BY')) {
            return {
            rows: [
                {
                id: 2,
                title: 'Autor personal 2',
                content : ' publicación Autor personal 2',
                author_id: 2,
                published: true, 
                created_at: '2026-06-30T12:00:00.000Z'
                },
                {
                id: 1,
                title: 'Autor personal 1',
                content : ' publicación Autor personal 1',
                author_id: 1,
                published: true, 
                created_at: '2026-06-30T12:00:00.000Z'
                }
            ]
            };
        }  
        
        // 4. Mock para INSERT - crear un posts
            if (sql.includes('INSERT INTO posts')) {
            const [title, content, author_id, published] = params;
            return {
                rows: [{
                id: 3,
                title,
                content,
                author_id: Number(author_id),
                published,
                created_at: '2026-06-20T12:00:00.000Z'
            }]
            };
        }

        if (sql.includes('UPDATE posts')) {
            const [title, content, author_id, published, id] = params;
            // 1. Forzamos que si el ID es 20 (o el que quieras probar como inexistente), devuelva rows vacío.
            if (Number(id) === 20) {
            return { rows: [] }; // Así tu código sabrá que "0 filas fueron afectadas" -> 404
            }
            return {
            rows: [{
                id: Number(id),
                title,
                content,
                author_id: Number(author_id),
                published,
                created_at: '2026-06-20T12:00:00.000Z'
            }]
            };
        }

                    // Mock para DELETE - eliminar posts
            if (sql.includes('DELETE FROM posts')) {
            const postId = params ? params[0] : null;

            // Caso 1: Si el ID es 20, simulamos que NO existe
            if (Number(postId) === 20) {
                return { rows: [], rowCount: 0 }; 
            }

            // Caso 2: Para cualquier otro ID (como el 2 de tu test), simulamos éxito
            return { 
                rows: [{ id: Number(postId), title: 'Post eliminado' }], // Por si tu código usa .rows[0]
                rowCount: 1 // Por si tu código valida las filas afectadas con .rowCount
            };
            }
                
        // Mock para otros queries
        return { rows: [] };
        })
    }
    }));

    describe ('POST/posts', ()=>{
        // test crea usuario con title, content y autor_id válidos
        test('1.crea usuario con title, content y autor_id válidos', async () => {
        const response = await request(app)
        .post('/posts')
        .send({ title: 'Nuevo post', content: 'ejemplo Nuevo post', author_id:1 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Nuevo post');
        expect(response.body.content).toBe('ejemplo Nuevo post');
        expect(response.body.author_id).toBe(1);

    });

        // Test para validar que el title, content y autor_id  no esten vacios
        test('2.rechaza request sin titulo, contenido y autor_id son requeridos', async () => {
        const response = await request(app)
        .post('/posts')
        .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('titulo, contenido, and autor_id son requeridos');
    });
        // test para rechazar un request sin titulo
        test('3.rechaza request sin title', async () => {
        const response = await request(app)
        .post('/posts')
        .send({ content : 'ejemplo content 3', author_id:1});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('titulo, contenido, and autor_id son requeridos');
    });

        test('4.rechaza request sin content', async () => {
        const response = await request(app)
        .post('/posts')
        .send({ title : ' content 3', author_id:1});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('titulo, contenido, and autor_id son requeridos');
    });

    });

    describe ('GET/posts', ()=>{
        //Test validar que el Id sea un número
        test('5. validar que el Id sea un número', async () => { 
        const num = 1;
        expect(esNum(num)).toBe(false);
        });
        //Test para obtener todos los posts
        test('6. validar que se consulten todos los posts', async ()=>{
            const response = await request (app)
            .get('/posts');

            expect(response.statusCode).toBe(200);
        });

    });
    
    describe('GET/posts/id', ()=> {
        // test para obtener un post por id
        test('7.obtener un posts por id', async () =>{
        const response = await request (app)
        .get('/posts/1')
        expect(response.statusCode).toBe(200);
        });

        // test para post no existente por id
        test('8.validar un posts no existente por id', async () =>{
        const response = await request (app)
        .get('/posts/5')
        expect(response.statusCode).toBe(404);
        });

        // test para validar que el id es invalido corresponde a una letra
        test('9.validar un posts cuando el id es invalido es una letra', async () =>{
        const response = await request (app)
        .get('/posts/a')
        expect(response.statusCode).toBe(400);
        });

    });

    describe('PUT/posts/id', ()=> {
        //Actualización de un autor
        test('10.Actualiza el post con title, content y autor_id válidos', async () => {
        const response = await request(app)
        .put('/posts/1')
        .send({ id:1, title: 'Nuevo post actualizado', content: 'ejemplo Nuevo post actualizado', author_id:1 });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Nuevo post actualizado');
        expect(response.body.content).toBe('ejemplo Nuevo post actualizado');
        expect(response.body.author_id).toBe(1);
    });
        
        // Test para validar que el nombre y correo no esten vacios para actualizar
        // Test para validar que el title, content y autor_id  no esten vacios
        test('11.rechaza request sin titulo, contenido y autor_id son requeridos', async () => {
        const response = await request(app)
        .put('/posts/1')
        .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('titulo, contenido, and autor_id son requeridos');
    });

        // actualizar un autor que no existe 
        test('12.actualizar un posts no existente por id', async () =>{
        const response = await request (app)
        .put('/posts/20')
        .send({title: 'Nuevo post modificado', content: 'ejemplo Nuevo post modificado', author_id:2 , published:true});
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toContain('Post no encontrado');
    });

        // test para validar que el id es invalido corresponde a una letra
        test('13.validar un posts cuando el id es invalido es una letra', async () =>{
        const response = await request (app)
        .put('/posts/a')
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('El id debe ser un número');
        });

        // test para validar que el id es invalido corresponde a un  número negativo
        test('14.validar un posts cuando el id es invalido numero negativo', async () =>{
        const response = await request (app)
        .put('/posts/-1')
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toContain('El id debe ser un número válido');
        });

    });

    describe ('DELETE/posts', ()=>{
        //Test para eliminar un post por id
        test('15. eliminar un posts por id', async ()=>{
            const response = await request (app)
            .delete('/posts/2');

            expect(response.statusCode).toBe(200);
        });

        test('16.validar un posts cuando el id es invalido es una letra', async () =>{
        const response = await request (app)
        .delete('/posts/a')
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('El id debe ser un número');
        });

        // test para validar que el id es invalido corresponde a un  número negativo
        test('17.validar un posts cuando el id es invalido numero negativo', async () =>{
        const response = await request (app)
        .delete('/posts/-1')
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toContain('El id debe ser un número válido');
        });

        // test para autor no existente por id
        test('18.validar un posts no existente por id', async () =>{
        const response = await request (app)
        .delete('/posts/20')
        expect(response.statusCode).toBe(404);
        });

    });
    