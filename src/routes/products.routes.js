import { Router } from "express";

import { getTimeZone, setGeneralConfigurations, setTimeZone } from '../controllers/general.controller'

const router = Router();

router.get("/general", setGeneralConfigurations);

router.get("/time-zone", getTimeZone);
router.post("/time-zone", setTimeZone);

export default router;
