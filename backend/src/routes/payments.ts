import { Router, Request, Response } from 'express';
import Payment from '../models/Payment';
import Student from '../models/Student';
import { sendPaymentNotification } from '../services/WhatsAppService';

const router = Router();

// Record payment
router.post('/', async (req: Request, res: Response) => {
  try {
    const { studentId, amount, note } = req.body;

    // Get student info
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Create payment record
    const payment = new Payment({
      studentId,
      amount,
      paidAt: new Date(),
      note,
    });

    const savedPayment = await payment.save();

    // Update student paid amount
    const newPaidAmount = student.paidAmount + amount;
    await Student.findByIdAndUpdate(studentId, { paidAmount: newPaidAmount });

    // Send WhatsApp notification
    try {
      const date = new Date().toLocaleDateString('ar-SA');
      await sendPaymentNotification(
        student.parentPhone,
        student.fullName,
        amount,
        date
      );
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
    }

    res.status(201).json(savedPayment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get payments by student
router.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const payments = await Payment.find({ studentId }).sort('-paidAt');
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment statistics for student
router.get('/stats/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const totalPayments = await Payment.aggregate([
      { $match: { studentId: require('mongoose').Types.ObjectId(studentId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const remaining = Math.max(0, student.totalFees - student.paidAmount);

    res.json({
      totalFees: student.totalFees,
      paidAmount: student.paidAmount,
      remaining,
      paymentPercentage: ((student.paidAmount / student.totalFees) * 100).toFixed(2),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all payments
router.get('/', async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find()
      .populate('studentId')
      .sort('-paidAt');
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get payments by date range
router.get('/date/:startDate/:endDate', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.params;
    const payments = await Payment.find({
      paidAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate('studentId')
      .sort('-paidAt');
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
