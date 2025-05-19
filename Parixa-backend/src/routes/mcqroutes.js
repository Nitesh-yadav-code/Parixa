import express from "express"
import { createQuestionBanks, getQuestionBanks, getQuestions } from "../controllers/mcqController.js";

const router = express.Router();

router.get('/', getQuestionBanks)
router.get('/questions', getQuestions)
router.post('/', createQuestionBanks)


export default router