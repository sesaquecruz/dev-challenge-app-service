import { Router } from "express";
import { IDasHandler } from "../handler/das";
import { validator } from "../middleware/validator";
import { Mei } from "../schema/mei";

function initDasRouter(dasHandler: IDasHandler): Router {
  const router = Router();
  router.post("/", validator(Mei), dasHandler.sendDas);
  return router;
}

export { initDasRouter };
