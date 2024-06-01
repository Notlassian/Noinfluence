import pkg from 'pg';

const { Pool, Client } = pkg;
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'NoInfluence',
    password: process.env.DB_PWD,
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};
export const sqlPool = new Pool(config);

try {
    const result = await sqlPool.query(`SELECT 1+1 AS result`);
    if (result.rows[0].result === 2) console.log('DB connected successfully!');
} catch (err) {
    console.error(err);
}

export const sqlClient = new Client(config); //ONLY IF WE ARE DOING TRANSACTIONS

// try {
//   await sqlClient.connect();
//   const result = await sqlClient.query(`SELECT 1+1 AS result`);
//   if (result.rows[0].result == 2) console.log("DB connected successfully!")
// } catch (err) {
//   console.error(err);
// }
