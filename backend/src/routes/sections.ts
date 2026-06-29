import { Router, Request, Response } from 'express';
import Section from '../models/Section';

const router = Router();

// Create section
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, gender } = req.body;

    const section = new Section({
      name,
      gender,
    });

    const savedSection = await section.save();
    res.status(201).json(savedSection);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get all sections
router.get('/', async (req: Request, res: Response) => {
  try {
    const sections = await Section.find().populate('students');
    res.json(sections);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get section by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const section = await Section.findById(req.params.id).populate('students');
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(section);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add student to section
router.post('/:id/students/:studentId', async (req: Request, res: Response) => {
  try {
    const section = await Section.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { students: req.params.studentId } },
      { new: true }
    ).populate('students');

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(section);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Remove student from section
router.delete('/:id/students/:studentId', async (req: Request, res: Response) => {
  try {
    const section = await Section.findByIdAndUpdate(
      req.params.id,
      { $pull: { students: req.params.studentId } },
      { new: true }
    ).populate('students');

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(section);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update section
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('students');

    if (!updatedSection) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(updatedSection);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete section
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedSection = await Section.findByIdAndDelete(req.params.id);
    if (!deletedSection) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({ message: 'Section deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;