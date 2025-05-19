import mongoose from "mongoose";


const SetHeaderSchema = new mongoose.Schema(
  {
    id:          { type: String, required: true },   // e.g. "nbl-1"
    title:       { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { _id: false }
);

const ExamDetailsSchema = new mongoose.Schema(
  {
    time:             String,
    fullMarks:        String,
    passMarks:        String,
    validityTime:     String,
    negativeMarking:  String,
    numberOfQuestions:String,
  },
  { _id: false }
);

const questionBankSchema = new mongoose.Schema({
    id:            { type: String, required: true, unique: true },
    shortName:     String,
    title:         String,
    subtitle:      String,
    description:   String,
    bgColor:       String,
    glowColor:     String,
    tags:          [String],
    lastUpdated:   String,                    // keep "01 Jun" text, or change to Date if you prefer
    language:      String,
    purchases:     Number,
    originalPrice: Number,
    price:         Number,

    examDetails:   ExamDetailsSchema,
    sets:          [SetHeaderSchema],         // ***only headers here***
  },
  { timestamps: true }
)

const questionBanks = mongoose.model("QuestionBank", questionBankSchema)

export default questionBanks




