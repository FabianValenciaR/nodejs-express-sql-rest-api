import { getConnection, querys } from "../database";


export const setGeneralConfigurations = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.updateTimeZone);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * getTimeZone gets the time_zone parameter from specific table
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getTimeZone = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.selectTimeZone);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * setTimeZone performs an update on time_zone parameter
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const setTimeZone = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.updateTimeZone);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * getTimeZone gets the time_zone parameter from specific table
 * 
 * @param {*} req 
 * @param {*} res 
 */
 export const getReceiptParameters = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.selectReceiptParameters);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};