import { Router, Request, Response } from 'express';
import Behavior from '../models/Behavior';
import Student from '../models/Student';
import { sendBehaviorNotification } from '../services/WhatsAppService';

const router = Router();

// Record behavior
router.post('/', async (req: Request, res: Response) => {
  try {
    const { studentId, rating, note, type } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const behavior = new Behavior({
      studentId,
      rating,
      note,
      type,
    });

    const savedBehavior = await behavior.save();

    // Send WhatsApp notification
    try {
      await sendBehaviorNotification(student.parentPhone, student.fullName, note);
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
    }

    res.status(201).json(savedBehavior);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get behavior records by student
router.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const behaviors = await Behavior.find({ studentId }).sort('-createdAt');
    res.json(behaviors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get behavior statistics for student
router.get('/stats/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const totalRecords = await Behavior.countDocuments({ studentId });
    const excellentCount = await Behavior.countDocuments({
      studentId,
      rating: 'excellent',
    });
    const goodCount = await Behavior.countDocuments({
      studentId,
      rating: 'good',
    });
    const poorCount = await Behavior.countDocuments({
      studentId,
      rating: 'poor',
    });

    res.json({
      totalRecords,
      excellent: excellentCount,
      good: goodCount,
      poor: poorCount,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all behavior records
router.get('/', async (req: Request, res: Response) => {
  try {
    const behaviors = await Behavior.find()
      .populate('studentId')
      .sort('-createdAt');
    res.json(behaviors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
