import express, { Router } from "express";
import {
  getAllAreaBlocks,
  getAllTerritory,
  getById,
} from "../controllers/zone/zone-ctrl";

import {getByTerritoryByInput} from "../controllers/zone/zone-mdlr"

const router: Router = express.Router({
  caseSensitive: true,
  strict: true,
});

router.get("/area_block", getAllAreaBlocks);
router.get("/territory", getAllTerritory);
router.get("/territory_by", [getByTerritoryByInput]);
// router.post("/area_block", createAreaBlock);
router.get("/get/:id", getById);

export default router;
