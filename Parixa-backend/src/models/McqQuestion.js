import mongoose from "mongoose";

const McqQuestionSchema = new mongoose.Schema(
  {
    setId:        { type: String, required: true }, // "nbl-1"
    bankId:       { type: String, required: true }, // "nbl"      (handy for queries)
    id:           { type: String, required: true }, // "nbl-1-q1"
    question:     { type: String, required: true },
    options:      { type: [String], required: true },
    correctOption:{ type: Number, required: true },
    explanation:  { type: String },
  },
  { timestamps: true }
);

McqQuestionSchema.index({ setId: 1 });  // quick look‑ups by set
McqQuestionSchema.index({ bankId: 1 });


       const McqQuestions = mongoose.model("McqQuestion", McqQuestionSchema)
       
       export default McqQuestions
