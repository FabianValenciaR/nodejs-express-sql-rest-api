import { Router } from "express";

import { setGeneralConfigurations } from '../controllers/general.controller'

const router = Router();

router.get("/general", setGeneralConfigurations);

export default router;
