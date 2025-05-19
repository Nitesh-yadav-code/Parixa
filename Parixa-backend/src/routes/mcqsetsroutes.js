import express from "express"
import { getQuestionSets} from "../controllers/mcqSetsController.js";

const router = express.Router();

router.get('/', getQuestionSets)


export default router