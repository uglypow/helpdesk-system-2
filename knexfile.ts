// Update with your config settings.
const config = {
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "users",
    user: "root",
    password: "mypassword",
    port: "3308",
  },
  pool: {
    min: parseInt(process.env.DATABASE__POOL_MIN || "1"),
    max: parseInt(process.env.DATABASE__POOL_MAX || "1"),
    acquireTimeoutMillis: parseInt(process.env.DATABASE__TIMEOUT || "180000"),
  },
  migrations: { directory: "./migrations/" },
  seeds: {
    directory: './seeds/dev',
  },
};
export default config
