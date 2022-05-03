import sql from "mssql";
import config from "../config";

export const dbSettings = {
  user: "PowerUser",
  password: "k8a3z7up1",
  server: "localhost",
  database: "XETUXPOS",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };
