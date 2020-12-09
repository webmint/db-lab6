const fastify = require('fastify')({
  logger: true,
});

fastify.register(require('fastify-cors'), {
  // put your options here
});

const pgp = require('pg-promise')(/* options */);

const db = pgp('postgres://administrator:admin@localhost:5432/lab4');

// Declare a route
fastify.get('/employees', async (request, reply) => {
  try {
    db.many('SELECT * FROM employees')
      .then((data) => {
        reply.send({ data });
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  } catch (e) {
    console.log(e);
  }
});

fastify.post('/employees/delete', async (request, reply) => {
  const { id } = request.body;
  try {
    db.one('DELETE FROM employees WHERE id = $1 RETURNING id', id)
      .then((data) => {
        console.log(data);
        reply.send({ data });
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  } catch (e) {
    console.log(e);
  }
});

fastify.post('/employees/update', async (request, reply) => {
  const {
    // eslint-disable-next-line camelcase
    children_amount,
    // eslint-disable-next-line camelcase
    full_name,
    id,
    // eslint-disable-next-line camelcase
    marital_status_id,
    position,
    salary,
  } = request.body;
  try {
    db.one('UPDATE employees set children_amount = $1, full_name = $2, marital_status_id = $3, position = $4, salary = $5 WHERE id = $6 RETURNING *',
      [
        // eslint-disable-next-line camelcase
        children_amount,
        // eslint-disable-next-line camelcase
        full_name,
        // eslint-disable-next-line camelcase
        marital_status_id,
        position,
        salary,
        id])
      .then((data) => {
        console.log(data);
        reply.send({ data });
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  } catch (e) {
    console.log(e);
  }
});

fastify.post('/employees/new', async (request, reply) => {
  const {
    // eslint-disable-next-line camelcase
    children_amount,
    // eslint-disable-next-line camelcase
    full_name,
    // eslint-disable-next-line camelcase
    marital_status_id,
    // eslint-disable-next-line camelcase
    personal_card_id,
    position,
    salary,
  } = request.body;
  try {
    db.one('INSERT INTO employees(children_amount, full_name, marital_status_id, personal_card_id, position, salary) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        // eslint-disable-next-line camelcase
        children_amount,
        // eslint-disable-next-line camelcase
        full_name,
        // eslint-disable-next-line camelcase
        marital_status_id,
        // eslint-disable-next-line camelcase
        personal_card_id,
        position,
        salary,
      ])
      .then((data) => {
        console.log(data);
        reply.send({ data });
      })
      .catch((error) => {
        console.log('ERROR:', error);
      });
  } catch (e) {
    console.log(e);
  }
});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
