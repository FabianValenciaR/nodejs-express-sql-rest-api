import { Router } from "express";

import { getReceiptParameters, getTimeZone, setGeneralConfigurations, setTimeZone } from '../controllers/general.controller'

const router = Router();

router.get("/general", setGeneralConfigurations);

router.get("/time-zone", getTimeZone);
router.post("/time-zone", setTimeZone);

router.get("/receipt-parameter", getReceiptParameters);


export default router;
