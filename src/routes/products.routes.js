import { Router } from "express";

import { deleteNotificationEmails, forwardInvoice, genericSelect, genericUpdate, getCustomerInformation, getCustomerTypes, getDashboardConfig, getInvoiceConfig, getInvoices, getNotificationEmails, getPaymentMethods, getReceiptParameters, getTimeZone, getXONEConfig, goLive, setCurrencyConfiguration, setDashboardConfig, setDocumentTypes, setGeneralConfigurations, setInvoiceConfig, setNotificationEmails, setReceiptParameters, setTimeZone, setXONEConfig, updateCustomerInformation } from '../controllers/general.controller'

const router = Router();

router.get("/general", setGeneralConfigurations);
router.post("/generic-select", genericSelect);
router.post("/generic-update", genericUpdate);

router.get("/time-zone", getTimeZone);
router.post("/time-zone", setTimeZone);

router.get("/receipt-parameter", getReceiptParameters);
router.post("/receipt-parameter", setReceiptParameters);

router.get("/notification-emails", getNotificationEmails);
router.post("/notification-emails", setNotificationEmails);
router.delete("/notification-emails/:email", deleteNotificationEmails);

router.get("/xone-config", getXONEConfig);
router.post("/xone-config", setXONEConfig);

router.get("/dashboard-config", getDashboardConfig);
router.post("/dashboard-config", setDashboardConfig);


router.get("/payment-methods", getPaymentMethods);

router.get("/invoice-config", getInvoiceConfig);
router.post("/invoice-config", setInvoiceConfig);

router.post("/document-types", setDocumentTypes);

// Si el currencyId no es 1 hay que user ALTER INSERT para poder alterar primary key
// Para todos los registros de abajo quedan en 1 
router.post("/currency-config", setCurrencyConfiguration);

router.post("/go-live", goLive);

// Agregar un filtro de fecha pero las facturas con mas de 30 dias de antiguedad no serian editables
router.post("/invoices", getInvoices);
router.get("/customer-types", getCustomerTypes);

router.get("/customer/:customerId", getCustomerInformation);
router.post("/customer", updateCustomerInformation);

router.post("/forward-invoice", forwardInvoice);




export default router;
