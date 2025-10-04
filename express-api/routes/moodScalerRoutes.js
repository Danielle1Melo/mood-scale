import express from "express";
import MoodScalerController from '../controller/MoodScalerController.js';
import { asyncWrapper } from '../utils/helpers/index.js';

const router = express.Router();
const moodScalerController = new MoodScalerController();

router
    .get("/mood-votes/statistics", asyncWrapper(moodScalerController.estatisticas.bind(moodScalerController)))
    .get("/mood-votes", asyncWrapper(moodScalerController.listar.bind(moodScalerController)))
    .get("/mood-votes/:id", asyncWrapper(moodScalerController.buscarPorId.bind(moodScalerController)));

export default router;