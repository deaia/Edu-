import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  studentId: mongoose.Types.ObjectId;
  subject: string;
  type: 'weekly' | 'monthly' | 'half-year';
  score: number;
  totalScore: number;
  percentage: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    type: { type: String, enum: ['weekly', 'monthly', 'half-year'], required: true },
    score: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    percentage: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ExamSchema.pre('save', function (next) {
  this.percentage = (this.score / this.totalScore) * 100;
  next();
});

export default mongoose.model<IExam>('Exam', ExamSchema);
