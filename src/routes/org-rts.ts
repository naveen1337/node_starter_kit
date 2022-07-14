import express, { Router } from "express";
import { createOrg } from "../controllers/orgs/orgs-ctrl";
import {xInputCreateOrg} from "../controllers/orgs/org-mdlr"
const router: Router = express.Router({
  caseSensitive: true,
  strict: true,
});

router.post("/create",[xInputCreateOrg], createOrg);

export default router;
