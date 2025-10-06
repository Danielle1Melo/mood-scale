import express from "express";
import MoodScalerController from '../controller/MoodScalerController.js';
import { asyncWrapper } from '../utils/helpers/index.js';

const router = express.Router();
const moodScalerController = new MoodScalerController();

router.post("/mood-votes", asyncWrapper(moodScalerController.criar.bind(moodScalerController)));

export default router;