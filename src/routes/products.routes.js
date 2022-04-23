import { Router } from "express";

import { deleteNotificationEmails, genericSelect, genericUpdate, getDashboardConfig, getInvoiceConfig, getNotificationEmails, getPaymentMethods, getReceiptParameters, getTimeZone, getXONEConfig, setCurrencyConfiguration, setDashboardConfig, setDocumentTypes, setGeneralConfigurations, setInvoiceConfig, setNotificationEmails, setReceiptParameters, setTimeZone, setXONEConfig } from '../controllers/general.controller'

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

router.post("/currency-config", setCurrencyConfiguration);


export default router;
