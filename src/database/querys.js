export const querys = {
  updateTimeZone: "UPDATE T_SYS_REGION_TIMEZONE SET time_zone = 'America/Guayaquil' WHERE id = 7",
  selectTimeZone: "SELECT time_zone FROM T_SYS_REGION_TIMEZONE WHERE id = 7",
  selectReceiptParameters: "SELECT receipt_description FROM T_POS_RECEIPT_FISCAL_PRINTER WHERE receipt_id = 8 OR receipt_id = 12 OR receipt_id = 20 OR receipt_id = 21",
  updateReceiptParameters: "UPDATE T_POS_RECEIPT_FISCAL_PRINTER SET receipt_description = 'IVA 15%' WHERE receipt_id = 8",
  selectNotificationEmails: "SELECT Correo, EnviarInventario, EnviarVentas FROM DESTINATARIO",
  selectXONEConfig: "SELECT idBranch, reportSyncUrlService FROM T_XSC_CONFIG",
  selectDashboardConfig: "SELECT url FROM T_PA_EXTERNAL_DASHBOARD WHERE id = 1",
  selectPaymentMethods: "SELECT payform_id, payform_description, code_timbra_payform FROM T_POS_PAYFORM",
  selectInvoiceConfig: "SELECT external_store_id, auth_user, auth_password, url_root, url_root_2, classifier FROM T_POS_WEB_SALES_CONFIG WHERE external_system_id = '11'",
};
