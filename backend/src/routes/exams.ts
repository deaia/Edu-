import { Router, Request, Response } from 'express';
import Exam from '../models/Exam';
import Student from '../models/Student';

const router = Router();

// Create exam record
router.post('/', async (req: Request, res: Response) => {
  try {
    const { studentId, subject, score, maxScore, grade } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const exam = new Exam({
      studentId,
      subject,
      score,
      maxScore: maxScore || 100,
      grade,
      date: new Date(),
    });

    const savedExam = await exam.save();
    res.status(201).json(savedExam);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get exams by student
router.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const exams = await Exam.find({ studentId }).sort('-date');
    res.json(exams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get student exam statistics
router.get('/stats/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const exams = await Exam.find({ studentId });
    if (exams.length === 0) {
      return res.json({
        totalExams: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
      });
    }

    const totalScore = exams.reduce((sum, exam) => sum + exam.score, 0);
    const averageScore = (totalScore / exams.length).toFixed(2);
    const highestScore = Math.max(...exams.map((e) => e.score));
    const lowestScore = Math.min(...exams.map((e) => e.score));

    res.json({
      totalExams: exams.length,
      averageScore,
      highestScore,
      lowestScore,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get exams by subject
router.get('/subject/:subject', async (req: Request, res: Response) => {
  try {
    const { subject } = req.params;
    const exams = await Exam.find({ subject })
      .populate('studentId')
      .sort('-date');
    res.json(exams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all exams
router.get('/', async (req: Request, res: Response) => {
  try {
    const exams = await Exam.find()
      .populate('studentId')
      .sort('-date');
    res.json(exams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update exam
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(updatedExam);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete exam
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
