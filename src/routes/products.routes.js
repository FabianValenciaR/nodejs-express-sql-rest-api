import { Router } from "express";

import { genericSelect, genericUpdate, getNotificationEmails, getReceiptParameters, getTimeZone, getXONEConfig, setGeneralConfigurations, setReceiptParameters, setTimeZone, setXONEConfig } from '../controllers/general.controller'

const router = Router();

router.get("/general", setGeneralConfigurations);
router.post("/generic-select", genericSelect);
router.post("/generic-update", genericUpdate);

router.get("/time-zone", getTimeZone);
router.post("/time-zone", setTimeZone);

router.get("/receipt-parameter", getReceiptParameters);
router.post("/receipt-parameter", setReceiptParameters);

router.get("/notification-emails", getNotificationEmails);
router.post("/notification-emails", getReceiptParameters);
router.delete("/notification-emails", getReceiptParameters);

router.get("/xone-config", getXONEConfig);
router.post("/xone-config", setXONEConfig);


export default router;
