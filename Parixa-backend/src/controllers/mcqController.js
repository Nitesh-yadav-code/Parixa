import { questionBanks } from "../seed/questionBanks.js"
import QuestionBank from "../models/QuestionBank.js"
import McqQuestion from "../models/McqQuestion.js"
import {nblQuestions, civilSubEngineerQuestions} from '../seed/questions.js'

export const getQuestionBanks =  async (req, res)=>{
    try {
    const banks = await QuestionBank.find().lean();  // for fetching questionsBanks
    // const banks = await McqQuestion.find().lean();  // for fetching questions
    res.json(banks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Fetch failed' });
  }
}
export const getQuestions =  async (req, res)=>{
    try {
    const banks = await McqQuestion.find().lean();  // for fetching questions
    res.json(banks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Fetch failed' });
  }
}

export const createQuestionBanks =  async (req, res)=>{
  try {
    // Optional: prevent reseeding if data already exists
    const existing = await QuestionBank.estimatedDocumentCount();
    if (existing > 0) {
      return res.status(409).json({ message: 'Database already seeded.' });
    }

    // Insert banks
    await QuestionBank.insertMany(questionBanks);

    // Flatten and insert MCQs
    const mcqs = Object.entries({
      ...nblQuestions,
      ...civilSubEngineerQuestions,
    }).flatMap(([setId, qs]) =>
      qs.map((q) => ({ ...q, setId, bankId: setId.split('-')[0] }))
    );

    await McqQuestion.insertMany(mcqs);

    console.log('Seeded banks & questions');
    res.status(201).json({ message: ' Database seeded successfully.' });
  } catch (err) {
    console.error(' Seeding failed:', err);
    res.status(500).json({ error: 'Seeding failed', details: err });
  }
}