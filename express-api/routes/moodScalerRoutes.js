import express from "express";
import MoodScalerController from "../controller/MoodScalerController.js";
import { asyncWrapper } from "../utils/helpers/index.js";

const router = express.Router();
const moodScalerController = new MoodScalerController();
router
  .post(
    "/mood-scale",
    asyncWrapper(moodScalerController.criar.bind(moodScalerController))
  )
  .get(
    "/mood-scale/statistics",
    asyncWrapper(moodScalerController.estatisticas.bind(moodScalerController))
  )
  .get(
    "/mood-scale",
    asyncWrapper(moodScalerController.listar.bind(moodScalerController))
  )
  .get(
    "/mood-scale/:id",
    asyncWrapper(moodScalerController.buscarPorId.bind(moodScalerController))
  );

export default router;
