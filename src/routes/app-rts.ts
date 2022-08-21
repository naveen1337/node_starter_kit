import express, { Router } from "express";
import { controll } from "../controllers/app/app-ctrl";
import { xInputCreateOrg } from "../controllers/orgs/org-mdlr";
const router: Router = express.Router({
  caseSensitive: true,
  strict: true,
});

router.get("/controll", controll);

export default router;
