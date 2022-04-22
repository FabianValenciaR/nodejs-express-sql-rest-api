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
      query += `UPDATE ${tableName} SET ${record.setProperty} = '${record.setValue}' WHERE ${record.conditionProperty} = '${record.conditionValue}';`
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

/**
 * getNotificationEmails gets the emails for notifications
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getNotificationEmails = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.selectNotificationEmails);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

/**
* setNotificationEmails sets the emails for notifications
* 
* @param {*} req  { id: "123", email: "test@test.com", notifyInventory: "1", notifySales: "0" }
* @param {*} res 
*/
export const setNotificationEmails = async (req, res) => {
  try {
    let response;
    const records = req.body[0];
    const id = records.id;
    const email = records.email;
    const notifyInventory = records.notifyInventory ? '1' : '0';
    const notifySales = records.notifySales ? '1' : '0';
    let selectQuery = `SELECT * FROM DESTINATARIO 
                  WHERE Correo = '${id}';`;

    const pool = await getConnection();
    const selectReponse = await pool.request().query(selectQuery);

    if (selectReponse.rowsAffected[0] !== 0) {

      let updateQuery = `UPDATE DESTINATARIO 
                  SET Correo = '${email}', 
                  EnviarInventario = '${notifyInventory}', 
                  EnviarVentas = '${notifySales}' 
                  WHERE Correo = '${id}';`;
      response = await pool.request().query(updateQuery);

    } else {

      let insertQuery = `INSERT INTO DESTINATARIO 
                          (Correo, EnviarInventario, EnviarVentas)
                          VALUES ('${email}', '${notifyInventory}', '${notifySales}');`
      response = await pool.request().query(insertQuery);

    }

    res.json(response.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * deleteNotificationEmails delete an email from the table
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const deleteNotificationEmails = async (req, res) => {
  try {
    let email = req.params.email;
    // let selectQuery = `SELECT * FROM DESTINATARIO 
    //               WHERE Correo = '${email}';`;

    // const selectReponse = await pool.request().query(selectQuery);
    // if (selectReponse.rowsAffected[0] !== 0) {


    // }
    const pool = await getConnection();
    let deleteQuery = `DELETE FROM DESTINATARIO WHERE Correo = '${email}';`;
    const result = await pool.request().query(deleteQuery);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

/**
 * getNotificationEmails gets the emails for notifications
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getXONEConfig = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.selectXONEConfig);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}


/**
* setXONEConfig sets the XONE config parameters
* 
* @param {*} req 
* @param {*} res 
*/
export const setXONEConfig = async (req, res) => {
  try {
    const idBranch = req.body.filter((field) => field.key === 'idBranch')[0].value;
    const reportSyncUrlService = req.body.filter((field) => field.key === 'reportSyncUrlService')[0].value;
    let query = `UPDATE T_XSC_CONFIG 
                  SET idBranch = '${idBranch}', reportSyncUrlService = '${reportSyncUrlService}';`;
    const pool = await getConnection();
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * getDashboardConfig gets the dashboard configurations
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getDashboardConfig = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.selectDashboardConfig);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * setDashboardConfig performs an update on url dashboard parameter
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const setDashboardConfig = async (req, res) => {
  try {
    const url = req.body[0]["value"];
    const query = `UPDATE T_PA_EXTERNAL_DASHBOARD SET url = '${url}' WHERE id = 1;`;
    const pool = await getConnection();
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * getPaymentMethods gets the payment methods configurations
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getPaymentMethods = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.selectPaymentMethods);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * getInvoiceConfig gets the invoice configurations
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getInvoiceConfig = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.selectInvoiceConfig);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
* setInvoiceConfig sets the invoice config parameters
* 
* @param {*} req 
* @param {*} res 
*/
export const setInvoiceConfig = async (req, res) => {
  try {
    const external_store_id = req.body.filter((field) => field.key === 'external_store_id')[0].value;
    const auth_user = req.body.filter((field) => field.key === 'auth_user')[0].value;
    const auth_password = req.body.filter((field) => field.key === 'auth_password')[0].value;
    const url_root = req.body.filter((field) => field.key === 'url_root')[0].value;
    const url_root_2 = req.body.filter((field) => field.key === 'url_root_2')[0].value;
    const classifier = req.body.filter((field) => field.key === 'classifier')[0].value;
    let query_sinc = `delete from T_POS_WEB_SALES_CONFIG    INSERT [dbo].[T_POS_WEB_SALES_CONFIG] ([external_system_id], [external_store_id], [auth_user], [auth_password], [environment_id], [item_delivery_fee_id], [activated], [url_root], [url_root_2], [business_unit_id], [invert_currencies], [classifier]) VALUES ( 11, N''${external_store_id}'', N''${auth_user}'', N''${auth_password}'', NULL, NULL, 1, N''${url_root}'', N''${url_root_2}'', NULL, 0, N''${classifier}'')`;
    let primary_query = `UPDATE T_XSC_SINC_AFTER SET code_sync_text = '${query_sinc}' WHERE priority_exec = 2;
                          ${query_sinc.replaceAll(`''`, `'`)}`;

    const pool = await getConnection();
    const result = await pool.request().query(primary_query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * setDashboardConfig performs an update on url dashboard parameter
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const setDocumentTypes = async (req, res) => {
  try {
    const pool = await getConnection();
    const selectQuery = `SELECT * FROM T_POS_CUSTOMER_TYPE;`;
    const selectResult = await pool.request().query(selectQuery);
    let cedulaRecord = selectResult.recordset.filter((record) => record.customer_type_description === 'C')[0];
    const updateQuery = `UPDATE T_POS_CUSTOMER 
                    SET customer_phone = '022222222',
                    customer_identification = 0,
                    customer_type_id = ${cedulaRecord.customer_type_id},
                    customer_full_identification = 'V -'
                    WHERE customer_id = 1;`
    console.log(updateQuery);
    const result = await pool.request().query(updateQuery);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

