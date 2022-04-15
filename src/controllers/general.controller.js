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
* genericUpdate sets a general update
* 
* @param {*} req {tableName: "NAME", records: [{setProperty: id, setValue: 1, conditionProperty: year, conditionValue: 1996}]}
* @param {*} res 
*/
export const genericUpdate = async (req, res) => {
  try {
    const records = req.body.records;
    const tableName = req.body.tableName;
    let query = "";
    records.forEach(record => {
      query += `UPDATE ${tableName} SET ${record.setProperty} = '${record.setValue}' WHERE ${record.conditionProperty} = ${record.conditionValue};`
    });
    const pool = await getConnection();
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
* genericSelect selects a generic query
* 
* @param {*} req {tableName:"TABLE", records: "id, name", conditions:[{field: "id", value: "1"}]}
* @param {*} res 
*/
export const genericSelect = async (req, res) => {
  try {
    const records = req.body.records;
    const conditions = req.body.conditions;
    const tableName = req.body.tableName;

    let query = `SELECT ${records} FROM ${tableName} WHERE `;
    conditions.forEach((condition, i) => {
      if (i == 0) {
        query += `${condition.field} = ${condition.value}`
      } else {
        query += `OR ${condition.field} = ${condition.value}`
      }
    });
    console.log(query);
    const pool = await getConnection();
    const result = await pool.request().query(query);
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
    const time_zone = req.body[0]["value"];
    const query = `UPDATE T_SYS_REGION_TIMEZONE SET time_zone = '${time_zone}' WHERE id = 7`;
    const pool = await getConnection();
    const result = await pool.request().query(query);
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
* setReceiptParameters sets the receipt parameters
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