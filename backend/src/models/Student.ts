import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  fullName: string;
  fatherName: string;
  motherName: string;
  familyName: string;
  gender: 'male' | 'female';
  age: number;
  studentPhone: string;
  parentPhone: string;
  parentJob: string;
  address: string;
  sectionId?: mongoose.Types.ObjectId;
  enrollmentDate: Date;
  totalFees: number;
  paidAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    familyName: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    age: { type: Number, required: true },
    studentPhone: { type: String, required: true },
    parentPhone: { type: String, required: true },
    parentJob: { type: String, required: true },
    address: { type: String, required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
    enrollmentDate: { type: Date, default: Date.now },
    totalFees: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>('Student', StudentSchema);
