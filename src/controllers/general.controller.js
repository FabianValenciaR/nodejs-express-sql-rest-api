import { INVOICE_STATUS } from "../constants/invoice";
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
    let id = req.body.filter((field) => field.key === 'id')[0].value;
    let url = req.body.filter((field) => field.key === 'url')[0].value;
    let position = req.body.filter((field) => field.key === 'position')[0].value;
    let frame_height = req.body.filter((field) => field.key === 'frame_height')[0].value;
    const query = `UPDATE T_PA_EXTERNAL_DASHBOARD
                    SET url = '${url}',
                    position = '${position}',
                    frame_height = '${frame_height}',
                    created_at = GETDATE()
                    WHERE id = '${id}'`;
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
    const result = await pool.request().query(updateQuery);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * setCurrencyConfiguration update currency configuration
 * @param {*} req 
 * @param {*} res 
 */
export const setCurrencyConfiguration = async (req, res) => {
  try {
    const pool = await getConnection();
    const selectQuery = `SELECT * FROM T_POS_CURRENCY;`;
    const selectResult = await pool.request().query(selectQuery);
    let currencyId = selectResult.recordset.filter((record) => record.currency_description === 'USD')[0].currency_id;

    const updateCurrency = `DELETE FROM T_POS_CURRENCY_COIN 
                                WHERE currency_id <> ${currencyId};
    
                              UPDATE T_POS_CURRENCY_EQUIVALENCY
                                SET base_currency_id =  ${currencyId},
                                factor = 1,
                                factor_to_print = 1,
                                math_operation_id = 1,
                                math_operation_factor = 1;
                                
                              UPDATE T_XSC_POS_CURRENCY_EQUIVALENCY
                                SET base_currency_id =  ${currencyId},
                                factor = 1,
                                factor_to_print = 1,
                                math_operation_id = 1,
                                math_operation_factor = 1;`

    const result = await pool.request().query(updateCurrency);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * goLive delete transactions and update sequential
 * @param {*} req 
 * @param {*} res 
 */
export const goLive = async (req, res) => {
  try {
    const pool = await getConnection();
    const sequenceNumber = Number(req.body.sequencial);
    const goLiveQuery =
      `UPDATE T_POS_ITEM SET last_stock = 0;
    UPDATE T_POS_ITEM_WAREHOUSE SET lastStock = 0;
    UPDATE T_POS_WAREHOUSE SET is_sale = 1;
    
    DELETE FROM T_POS_EXTERNAL_BILLING_INFO;
     
    UPDATE T_POS_CONFIG_QR_SEQUENCE_BILL_SEND SET number_secuence = ${sequenceNumber};
    ALTER SEQUENCE SEQ_NUMBER_BILL_GENERIC_CODE RESTART WITH ${sequenceNumber + 1};
    
    DELETE FROM T_POS_CASHIER_BY_STATION;
    DELETE FROM T_POS_MERCHANDISE_RECEPTION_HEADER;
    DELETE FROM T_POS_MERCHANDISE_RECEPTION_BODY;
    DELETE FROM T_POS_MERCHANDISE_RECEPTION_BODY_OTHER_TAX;
    DELETE FROM T_POS_MERCHANDISE_RECEPTION_BODY_WAREHOUSE;
    DELETE FROM T_POS_MERCHANDISE_RECEPTION_BRANCH;
    DELETE FROM T_POS_MERCHANDISE_RECEPTION_HEADER_OTHER_TAX;
    DELETE FROM T_SYS_PAYMENT_PXP_RECEPTION_BODY;
    DELETE FROM T_SYS_PAYMENT_PXP_RECEPTION_BODY_DETAIL;
    DELETE FROM T_SYS_PAYMENT_PXP_RECEPTION_HEADER;
    DELETE FROM T_SYS_EMPLOYEE_FOOD_BODY;
    DELETE FROM T_SYS_EMPLOYEE_FOOD_HEADER;
    DELETE FROM T_PA_PROCESSING_BODY;
    DELETE FROM T_PA_PROCESSING_HEADER;
    DELETE FROM T_PA_PROCESSING_TEMPLATE_BODY;
    DELETE FROM T_PA_PROCESSING_TEMPLATE_HEADER;
    DELETE FROM T_SYS_CHANGE_STATUS_PRODUCTS;
    DELETE FROM T_POS_TEAM_USER_HISTORY;
    DELETE FROM T_POS_CUSTOMER_SCHEDULE_CONTROL_CONSUMED_LOG;
    DELETE FROM T_POS_TIPS_PAID;
    DELETE FROM T_SYS_USER_ACCESS_SYSTEM_LOG;
    DELETE FROM T_SYS_ACTIONS_LOG;
    DELETE FROM T_POS_ORDER_WORKSHIFT_TRANSFER_USER_LOG;
    UPDATE T_POS_ORDER_PRODUCT SET is_processed = 0;
    DELETE FROM T_BACKUP_B ;
    DELETE FROM T_BACKUP_B_BILL ;
    DELETE FROM T_BACKUP_B_BILL_BODY;
    DELETE FROM T_BACKUP_B_HEADER; 
    DELETE FROM T_BACKUP_PORTAL_LOG;
    DELETE FROM T_BACKUP_PORTAL;
    DELETE FROM T_POS_BILL_QR_MX;
    DELETE FROM T_POS_ORDER_WORKSHIFT_TRANSFER_USER_LOG;
    DELETE FROM T_POS_TRANSFER_ORDER_BODY;
    DELETE FROM T_POS_TRANSFER_ORDER_HEADER;
    DELETE FROM T_POS_PRODUCTION_BODY;
    DELETE FROM T_POS_PRODUCTION_HEADER;
    DELETE FROM T_POS_PRODUCTION_RECIPE_BODY;
    DELETE FROM T_POS_PRODUCTION_RECIPE_HEADER;
    DELETE FROM T_POS_ADDITIONAL_KDS_GROUP_ENVIRONMENTS;
    DELETE FROM T_POS_KDS_GROUP_ENVIRONMENT_PRODUCT;
    DELETE FROM T_POS_KDS_GROUP_ENVIRONMENTS;
    
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_CONSOLIDATE;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_CONSOLIDATE_2;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_CONSOLIDATE_BY_DISCOUNT;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_CONSOLIDATE_BY_PAYFORM;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_CONSOLIDATE_BY_PRODUCT_FAMILY;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_CONSOLIDATE_ITEM_TYPE;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_CONSOLIDATE_ORDER_TYPE;
    TRUNCATE TABLE T_REPORT_BACKEND_USER_SALES_CONSOLIDATE;
    TRUNCATE TABLE T_REPORT_BACKEND_USER_SALES_CONSOLIDATE_V2;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_SUBGROUPS_PRODUCT;
    TRUNCATE TABLE T_REPORT_BACKEND_SALES_PRODUCT_FAMILY;
    TRUNCATE TABLE T_REPORT_BACKEND_PROFITABILITY;
    
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE_2;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE_BY_DISCOUNT;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE_BY_PAYFORM;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE_BY_PRODUCT_FAMILY;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE_ITEM_TYPE;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE_ORDER_TYPE;
    DELETE FROM T_REPORT_BACKEND_SALES_PRODUCT_FAMILY;
    DELETE FROM T_REPORT_BACKEND_SALES_SUBGROUPS_PRODUCT;
    DELETE FROM T_REPORT_BACKEND_SCHEDULE_CONFIG;
    DELETE FROM T_REPORT_BACKEND_USER_SALES_CONSOLIDATE;
    DELETE FROM T_REPORT_BACKEND_USER_SALES_CONSOLIDATE_V2;
    DELETE FROM T_REPORT_PRODUCT_PROFITABILITY;
    DELETE FROM T_REPORT_USER_TYPE;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_HEADER;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_HEADER_XZ_REPORT;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_PAYFORM;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_PAYFORM_DETAIL;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_POINT_OF_SALE;
    DELETE FROM T_SYS_CASH_COUNT_HEADER;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_COIN;
    DELETE FROM T_POS_PRODUCTION_HEADER;
    DELETE FROM T_POS_PRODUCTION_BODY;  
    DELETE FROM T_POS_PRODUCTION_RECIPE_BODY;
    DELETE FROM T_POS_PRODUCTION_RECIPE_HEADER;
    DELETE FROM T_POS_TRANSFER_ORDER_BODY;
    DELETE FROM T_POS_TRANSFER_ORDER_HEADER;
    DELETE FROM T_REPORT_BACKEND_SALES_PRODUCT_FAMILY;
    DELETE FROM T_REPORT_BACKEND_SALES_SUBGROUPS_PRODUCT;
    DELETE FROM T_SYS_PRINTER_ERROR_LOG;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_PAYFORM_DETAIL;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE_BY_PRODUCT_FAMILY;
    DELETE FROM T_SYS_ACTIONS_SYSTEMS_LOG;
    DELETE FROM T_POS_PRODUCT_RESTRICTED_JOURNAL_CONSUMED;
    DELETE FROM T_REPORT_BACKEND_SALES_CONSOLIDATE;
    DELETE FROM T_REPORT_BACKEND_USER_SALES_CONSOLIDATE;
    DELETE FROM T_REPORT_BACKEND_USER_SALES_CONSOLIDATE_V2;
    DELETE FROM T_SYS_LOG_MASTER;
    DELETE FROM tPOS_ITEM_RECIPE_HISTORICAL;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_COIN;
    DELETE FROM T_POS_CASH_COUNT_DECLARE_PAYFORM;    
    DELETE FROM T_POS_BILL_QR_MX_FAILURE;
    DELETE FROM T_SYS_MOVEMENTS;
    DELETE FROM T_SYS_INVENTORY_WASTE_HEADER;
    DELETE FROM T_POS_EXPENSES;
    DELETE FROM T_SYS_INVENTORY_WASTE_BODY;
    DELETE FROM T_SYS_CASH_COUNT_BODY;
    DELETE FROM T_SYS_CASH_COUNT_HEADER;
    DELETE FROM T_SYS_INVENTORY_LOG_BODY;
    DELETE FROM T_SYS_INVENTORY_LOG_HEADER;
    DELETE FROM T_POS_ORDER_PAYFORMS_DEPOSIT_HISTORY;
    DELETE FROM T_POS_CONFIG_PAX_LOG_TRANSACTION;
    DELETE FROM T_SYS_MOVEMENTS WHERE movement_type_id = 1;
    DELETE FROM T_POS_CUSTOMER_ORDER;
    DELETE FROM T_POS_BILL_PAYMENT;
    DELETE FROM T_POS_PAYMENT;
    DELETE FROM T_POS_BILL;
    DELETE FROM T_POS_CUSTOMER WHERE customer_id <> 1;
    DELETE FROM T_POS_ORDER_PRODUCT_ANNULATION;
    DELETE FROM T_POS_MESSAGE_PRODUCT;
    DELETE FROM T_POS_ORDER_PRODUCT_DISCOUNT;
    DELETE FROM T_POS_CREDIT_NOTE_BODY;
    DELETE FROM T_POS_CREDIT_NOTE;
    DELETE FROM T_POS_SENT_RECEIPT_BODY;
    DELETE FROM T_POS_ORDER_PRODUCT;
    DELETE FROM T_POS_PREBILL_PAYMENT;
    DELETE FROM T_POS_PRE_BILL;
    DELETE FROM T_POS_BILL_PAYMENT;
    DELETE FROM T_POS_PAYMENT;
    DELETE FROM T_POS_BILL;
    DELETE FROM T_POS_MANAGEMENT_RECEIPT;
    DELETE FROM T_POS_BILL_WARNING_PAYMENT;
    DELETE FROM T_POS_BILL_WARNING;
    DELETE FROM T_POS_RAPPI_ORDER;
    DELETE FROM T_POS_SUBORDER;
    DELETE FROM T_POS_ORDER;
    DELETE FROM T_POS_ORDER_PAYFORMS;
    DELETE FROM T_POS_COMO_SUBMIT_PURCHASE_LOG;
    DELETE FROM T_POS_COMO_PAY_WITH_BUDGET_LOG;
    DELETE FROM T_POS_ORDER_PAYFORMS_DEPOSIT;    
    DELETE FROM T_POS_ORDER_PAYFORMS_DEPOSIT_HISTORY;

    DELETE FROM T_SYS_SPACE_SESSION_TOKEN;
    DELETE FROM T_SYS_USER_SESSION_TOKEN;
    UPDATE T_POS_SPACE SET space_status_id = 0;
    DELETE T_SYS_XZ_REPORT;     
    DELETE FROM T_POS_JOURNAL;    
    UPDATE T_SYS_PARAMETERS SET parameter_value = 0 WHERE parameter_id = 7;
    
    DBCC CHECKIDENT ('T_POS_ORDER',RESEED,0)
    DBCC CHECKIDENT ('T_POS_SUBORDER',RESEED,0)
    DBCC CHECKIDENT ('T_POS_ORDER_PRODUCT',RESEED,0)
    DBCC CHECKIDENT ('T_POS_ORDER_PRODUCT_DISCOUNT',RESEED,0)
    DBCC CHECKIDENT ('T_POS_BILL',RESEED,${sequenceNumber})
     
    UPDATE T_POS_CONFIG_QR_SEQUENCE_BILL_SEND SET number_secuence = ${sequenceNumber}`

    const result = await pool.request().query(goLiveQuery);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * getInvoices get invoices with pagination
 * @param {*} req 
 * @param {*} res 
 */
export const getInvoices = async (req, res) => {
  try {
    let numPerPage = parseInt(req.body.npp, 10) || 1;
    let page = parseInt(req.body.page, 10) || 0;
    let status = req.body.status || INVOICE_STATUS.AUTHORIZED;
    let skip = page * numPerPage;
    let statusCondition = '';
    switch (req.body.status) {
      case INVOICE_STATUS.AUTHORIZED:
        statusCondition = 'status = 11';
        break;

      case INVOICE_STATUS.NO_AUTHORIZED:
        statusCondition = 'status <> 11 OR status <> 0';
        break;

      case INVOICE_STATUS.FORWARDED:
        statusCondition = 'status = 0';
        break;

      default:
        statusCondition = 'status = 11';
        break;
    }
    const pool = await getConnection();
    const countResult = await pool.request().query(`SELECT count(*) as numRows FROM T_POS_EXTERNAL_BILLING_INFO WHERE ${statusCondition} AND created_at > DATEADD(MONTH,-1,GETDATE())`);
    const numRows = countResult.recordset[0].numRows;
    let numPages = Math.ceil(numRows / numPerPage);

    let query = `SELECT * FROM T_POS_EXTERNAL_BILLING_INFO WHERE ${statusCondition} AND created_at > DATEADD(MONTH,-1,GETDATE()) ORDER BY id DESC OFFSET ${skip} ROWS FETCH NEXT ${numPerPage} ROWS ONLY;`;
    let result = await pool.request().query(query);

    var responsePayload = {
      results: result.recordset
    };
    if (page < numPages) {
      responsePayload.pagination = {
        current: page,
        perPage: numPerPage,
        previous: page > 0 ? page - 1 : undefined,
        next: page < numPages - 1 ? page + 1 : undefined,
        totalRecords: numRows
      }
    }
    else responsePayload.pagination = {
      err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
    }
    res.json(responsePayload);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * getCustomerInformation get the information from a customer
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getCustomerInformation = async (req, res) => {
  try {
    let customerId = req.params.customerId;
    let selectQuery = `SELECT customer_id, customer_identification, customer_full_identification, customer_type_id FROM T_POS_CUSTOMER 
                  WHERE customer_identification = '${customerId}';`;
    const pool = await getConnection();
    const result = await pool.request().query(selectQuery);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

/**
 * updateCustomerInformation update customer information
 * @param {*} req 
 * @param {*} res 
 */
export const updateCustomerInformation = async (req, res) => {
  try {
    let customer_id = req.body.filter((field) => field.key === 'customer_id')[0].value;
    let customer_identification = req.body.filter((field) => field.key === 'customer_identification')[0].value;
    let customer_full_identification = req.body.filter((field) => field.key === 'customer_full_identification')[0].value;
    let customer_type_id = req.body.filter((field) => field.key === 'customer_type_id')[0].value;
    const pool = await getConnection();
    const updateCustomerInfo = `UPDATE T_POS_CUSTOMER
                                SET customer_identification = '${customer_identification}', 
                                customer_full_identification =  '${customer_full_identification}',
                                customer_type_id =  '${customer_type_id}'
                                WHERE customer_id = '${customer_id}';`
    const result = await pool.request().query(updateCustomerInfo);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/**
 * forwardInvoice re send invoice
 * @param {*} req 
 * @param {*} res 
 */
export const forwardInvoice = async (req, res) => {
  try {
    let bill_id = req.body.bill_id;
    const pool = await getConnection();
    const fordwardInvoiceQuery = `UPDATE T_POS_EXTERNAL_BILLING_INFO
                                SET status = 0, 
                                created_at =  GETDATE(),
                                updated_at =  NULL,
                                response =  NULL,
                                request =  NULL
                                WHERE bill_id = '${bill_id}';`
    console.log(fordwardInvoiceQuery);
    const result = await pool.request().query(fordwardInvoiceQuery);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


