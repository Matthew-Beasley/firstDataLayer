const db = require('pg');
const { Client } = pg;

const client = new Client('postgres://localhost/petadoption');
client.connect();
