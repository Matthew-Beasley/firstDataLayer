const db = require('pg');
const uuid = require('uuid/v4');
const { Client } = db;

const client = new Client('postgres://localhost/cal-poly');
client.connect();


const readCompanies = async () => {
  const sql = 'SELECT * FROM companies';
  const response = await client.query(sql)
  return response;
}


const createCompany = async (params) => {
  const sql = `INSERT INTO companies VALUES 
    ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const response = await client.query(sql, [uuid(), params.name, params.phone,
    params.state, params.catchPhrase, params.createdAt]);
  return response;
}


const updateCompany = async ({ column, value, id }) => {
  const sql = `UPDATE companies SET ${column} = $1 WHERE id = $2 RETURNING *`; // can't get $1 to work for column name
  const response = await client.query(sql, [value, id]);
  return response;
}


const deleteCompany = async ({ id }) => {
  const sql = 'DELETE FROM companies WHERE id = $1 RETURNING *';
  const response = await client.query(sql, [id]);
  return response;
}


module.exports = {
  readCompanies,
  createCompany,
  updateCompany,
  deleteCompany
};
