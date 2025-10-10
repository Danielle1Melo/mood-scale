import express from "express";
import MoodScalerController from "../controller/MoodScalerController.js";
import { asyncWrapper } from "../utils/helpers/index.js";
import { getDocsRouter } from "./docsRoutes.js";

const router = express.Router();
const moodScalerController = new MoodScalerController();
router
  .post(
    "/mood-votes",
    asyncWrapper(moodScalerController.criar.bind(moodScalerController))
  )
  .get(
    "/mood-votes/statistics",
    asyncWrapper(moodScalerController.estatisticas.bind(moodScalerController))
  )
  .get(
    "/mood-votes",
    asyncWrapper(moodScalerController.listar.bind(moodScalerController))
  )
  .get(
    "/mood-votes/:id",
    asyncWrapper(moodScalerController.buscarPorId.bind(moodScalerController))
  );

  router.use(getDocsRouter());

export default router;
