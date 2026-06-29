import { Router, Request, Response } from 'express';
import Attendance from '../models/Attendance';
import Student from '../models/Student';
import { sendAttendanceNotification } from '../services/WhatsAppService';

const router = Router();

// Record attendance
router.post('/', async (req: Request, res: Response) => {
  try {
    const { studentId, status, note } = req.body;

    // Get student info
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Create attendance record
    const attendance = new Attendance({
      studentId,
      status,
      note,
      date: new Date(),
    });

    const savedAttendance = await attendance.save();

    // Send WhatsApp notification if absent
    if (status === 'absent') {
      try {
        await sendAttendanceNotification(student.parentPhone, student.fullName);
      } catch (whatsappError) {
        console.error('WhatsApp notification failed:', whatsappError);
        // Continue even if WhatsApp fails
      }
    }

    res.status(201).json(savedAttendance);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get attendance by date
router.get('/date/:date', async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const attendance = await Attendance.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    }).populate('studentId');

    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance by student
router.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId }).sort('-date');
    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance statistics
router.get('/stats/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const total = await Attendance.countDocuments({ studentId });
    const present = await Attendance.countDocuments({
      studentId,
      status: 'present',
    });
    const absent = await Attendance.countDocuments({
      studentId,
      status: 'absent',
    });

    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    res.json({
      total,
      present,
      absent,
      attendancePercentage: percentage,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all attendance
router.get('/', async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.find()
      .populate('studentId')
      .sort('-date');
    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
