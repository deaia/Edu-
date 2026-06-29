import { Router, Request, Response } from 'express';
import Student from '../models/Student';

const router = Router();

// Get all students
router.get('/', async (req: Request, res: Response) => {
  try {
    const students = await Student.find().populate('sectionId').sort('fullName');
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get students by gender
router.get('/gender/:gender', async (req: Request, res: Response) => {
  try {
    const { gender } = req.params;
    const students = await Student.find({ gender }).populate('sectionId').sort('fullName');
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single student
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).populate('sectionId');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new student
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      fatherName,
      motherName,
      familyName,
      gender,
      age,
      studentPhone,
      parentPhone,
      parentJob,
      address,
      totalFees,
    } = req.body;

    const newStudent = new Student({
      fullName,
      fatherName,
      motherName,
      familyName,
      gender,
      age,
      studentPhone,
      parentPhone,
      parentJob,
      address,
      totalFees,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update student
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('sectionId');

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete student
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
