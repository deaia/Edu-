import mongoose, { Schema, Document } from 'mongoose';

export interface ISection extends Document {
  name: string;
  gender: 'male' | 'female';
  students: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

export default mongoose.model<ISection>('Section', SectionSchema);
