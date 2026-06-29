import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  studentId: mongoose.Types.ObjectId;
  subject: string;
  score: number;
  maxScore: number;
  date: Date;
  grade?: 'A' | 'B' | 'C' | 'D' | 'F';
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    maxScore: { type: Number, required: true, default: 100 },
    date: { type: Date, required: true, default: Date.now },
    grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F'] },
  },
  { timestamps: true }
);

export default mongoose.model<IExam>('Exam', ExamSchema);