import { getConnection, querys } from "../database";


export const setGeneralConfigurations = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllTimeZones);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };