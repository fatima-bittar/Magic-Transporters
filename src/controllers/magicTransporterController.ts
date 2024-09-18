import express from "express";
import { magicTransporterFunctionalities } from "../services/magicTransporterFunctionalities";

const router = express.Router();
const magicTransporterFuncs = new magicTransporterFunctionalities();

router.post("/mover", (req, res) => {
  const { weightLimit, name, energy } = req.body;
  const mover = magicTransporterFuncs.addMover(weightLimit, name, energy);
  res.status(201).json(mover);
});

router.get("/movers", (req, res) => {
  const allMovers = magicTransporterFuncs.getAllMovers();
  res.status(201).json(allMovers);
});

router.post("/item", (req, res) => {
  const { weight, name } = req.body;
  const item = magicTransporterFuncs.addItem(weight, name);
  res.status(201).json(item);
});

router.get("/items", (req, res) => {
  const allItems = magicTransporterFuncs.getAllItems();
  res.status(201).json(allItems);
});

router.post("/mover/:moverId/loadingItems", (req, res) => {
  const { moverId } = req.params;
  const { itemName } = req.body;
  const result = magicTransporterFuncs.loadMover(itemName, moverId);

  if (typeof result === "string") {
    res.status(400).json({ error: result });
  } else res.status(201).json(result);
});

router.post("/mover/:moverId/startingMission", (req, res) => {
  const { moverId } = req.params;
  const result = magicTransporterFuncs.startMissionMover(moverId);
  if (
    result === "mover is not found" ||
    result === "already the mover is on mission"
  ) {
    res.status(400).json({ error: result });
  } else res.status(201).json(result);
});

router.post("/mover/:moverId/endingMission", (req, res) => {
  const { moverId } = req.params;
  const result = magicTransporterFuncs.endMissionMover(moverId);
  if (result === "the mover completed its mission") {
    res.status(201).json(result);
  } else res.status(400).json({ error: result });
});

router.get("/movers/listing", (req, res) => {
  const result = magicTransporterFuncs.getHighestMoverMissions();
  res.status(201).json(result);
});

export default router;
