import { Router } from 'express';
import { createFeedback, getFeedbacks, getStats } from '../controllers/feedbackController.js';

const router = Router();

router.post('/feedback', createFeedback);
router.get('/feedback', getFeedbacks);
router.get('/stats', getStats);

export default router;
