const db = require('pg');
const { Client } = db;

const client = new Client('postgres://localhost/cal-poly');
client.connect();

const readCompanies = async () => {
  const sql = 'SELECT * FROM companies';
  const response = await client.query(sql)
  return response;
}

module.exports = { readCompanies };
