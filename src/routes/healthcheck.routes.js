import {Router} from "express"

import { healthcheck } from "../controllers/healthcheck.controllers.js"

const router = Router();

//GET is used for retrieving data and does not modify anything on the server.
router.route("/").get(healthcheck)
router.route("/test").get(healthcheck)
export default router