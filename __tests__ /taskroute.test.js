const request = require('supertest');
const fs = require('fs');
const path = require('path');
const testJsonFile = path.resolve(__dirname, '../server/db/markets.test.json');

const server = 'http://localhost:3030/api';
let _id;

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/task', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and application/json content type to port 3030 /api. webpack proxy is working', () => {
        return request(server)
          .get('/task')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });

      it('responds with an array of tasks with defined properties', () => {
        return request(server)
          .get('/task')
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  task_id: expect.any(Number),
                  task_name: expect.any(String),
                  due_date: expect.any(String),
                  completed: expect.any(Boolean),
                  expired: expect.any(Boolean),
                }),
              ])
            );
          });
      });
    });

    describe('POST', () => {
      it('posts a task, and received the task_id', () => {
        return request(server)
          .post('/task')
          .send({
            task_name: 'test',
            due_date: '2023-12-02T05:00:00.000Z',
            completed: false,
            expired: false,
          })
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            _id = res.body.task_id;
            expect(res.body).toEqual(
              expect.objectContaining({
                task_id: expect.any(Number),
                task_name: 'test',
                due_date: '2023-12-02T05:00:00.000Z',
                completed: false,
                expired: false,
              })
            );
          });
      });
    });

    describe('PUT', () => {
      it('modifies a task, and receives the new modified task', () => {
        return request(server)
          .put('/task')
          .send({
            task_id: _id,
            task_name: 'new test',
            due_date: '2023-12-02T05:00:00.000Z',
            completed: false,
            expired: false,
          })
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.objectContaining({
                task_id: _id,
                task_name: 'new test',
                due_date: '2023-12-02T05:00:00.000Z',
                completed: false,
                expired: false,
              })
            );
          });
      });
    });

    describe('DELETE', () => {
      it('deletes a task, and receives a 200 confirmation', () => {
        return request(server)
          .delete(`/task/${_id}`)
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});
