import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

FeedbackSchema.index({ createdAt: -1 });

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;
