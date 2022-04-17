import { Router } from "express";

import { genericSelect, genericUpdate, getDashboardConfig, getNotificationEmails, getReceiptParameters, getTimeZone, getXONEConfig, setDashboardConfig, setGeneralConfigurations, setNotificationEmails, setReceiptParameters, setTimeZone, setXONEConfig } from '../controllers/general.controller'

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
router.delete("/notification-emails", getReceiptParameters);

router.get("/xone-config", getXONEConfig);
router.post("/xone-config", setXONEConfig);

router.get("/dashboard-config", getDashboardConfig);
router.post("/dashboard-config", setDashboardConfig);



export default router;
