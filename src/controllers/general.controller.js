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
}

/**
* setTimeZone sets the time_zone parameters
* 
* @param {*} req 
* @param {*} res 
*/
export const setReceiptParameters = async (req, res) => {
  try {
    const records = req.body;
    let query = "";
    records.forEach(record => {
      query += `UPDATE T_POS_RECEIPT_FISCAL_PRINTER SET receipt_description = '${record.value}' WHERE receipt_id = ${record.key};`
    });
    const pool = await getConnection();
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};