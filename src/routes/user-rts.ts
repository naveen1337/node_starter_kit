import express, { Router } from "express";
import { xInputCreateUser } from "../controllers/user/user-mdlr";
import { createUser } from "../controllers/user/user-ctrl";

const router: Router = express.Router({
  caseSensitive: true,
  strict: true,
});

router.post("/create", [xInputCreateUser], createUser);

export default router