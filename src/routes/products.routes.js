import { Router } from "express";

import { genericSelect, genericUpdate, getReceiptParameters, getTimeZone, setGeneralConfigurations, setReceiptParameters, setTimeZone } from '../controllers/general.controller'

const router = Router();

router.get("/general", setGeneralConfigurations);
router.post("/generic-select", genericSelect);
router.post("/generic-update", genericUpdate);

router.get("/time-zone", getTimeZone);
router.post("/time-zone", setTimeZone);

router.get("/receipt-parameter", getReceiptParameters);
router.post("/receipt-parameter", setReceiptParameters);


export default router;
