import mongoose, { Schema, Document } from 'mongoose';

export interface IBehavior extends Document {
  studentId: mongoose.Types.ObjectId;
  rating: 'excellent' | 'good' | 'poor';
  note: string;
  type: 'praise' | 'warning' | 'note';
  createdAt: Date;
  updatedAt: Date;
}

const BehaviorSchema = new Schema<IBehavior>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    rating: { type: String, enum: ['excellent', 'good', 'poor'], required: true },
    note: { type: String, required: true },
    type: { type: String, enum: ['praise', 'warning', 'note'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBehavior>('Behavior', BehaviorSchema);
