export const querys = {
  updateTimeZone: "UPDATE T_SYS_REGION_TIMEZONE SET time_zone = 'America/Guayaquil' WHERE id = 7",
  selectTimeZone: "SELECT time_zone FROM T_SYS_REGION_TIMEZONE WHERE id = 7",
  selectReceiptParameters: "SELECT receipt_description FROM T_POS_RECEIPT_FISCAL_PRINTER WHERE receipt_id = 8 OR receipt_id = 12 OR receipt_id = 20 OR receipt_id = 21",
};
