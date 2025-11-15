import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res, next) => {
  try {
    const { name, email, message, rating } = req.body || {};

    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required' });
    }
    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const feedback = await Feedback.create({ name, email, message, rating: numericRating });
    return res.status(201).json({ success: true, feedback });
  } catch (err) {
    next(err);
  }
};

export const getFeedbacks = async (_req, res, next) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (err) {
    next(err);
  }
};

export const getStats = async (_req, res, next) => {
  try {
    const [stats] = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          positive: { $sum: { $cond: [{ $gte: ['$rating', 4] }, 1, 0] } },
          negative: { $sum: { $cond: [{ $lte: ['$rating', 2] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          averageRating: { $round: ['$averageRating', 2] },
          positive: 1,
          negative: 1,
        },
      },
    ]);

    res.json(
      stats || { total: 0, averageRating: 0, positive: 0, negative: 0 }
    );
  } catch (err) {
    next(err);
  }
};
