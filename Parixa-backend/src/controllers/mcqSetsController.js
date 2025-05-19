import McqQuestions from "../models/McqQuestion.js"
export const getQuestionSets =  async (req, res)=>{
    try {
    const banks = await McqQuestions.find().lean();  // for fetching questions
    res.json(banks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Fetch failed' });
  }
}