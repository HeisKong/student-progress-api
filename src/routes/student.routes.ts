import { Router } from 'express';
import { createStudent, getStudent, listStudents, updateStudent } from '../controllers/student.controller';
import { getProgress, saveProgress } from '../controllers/progress.controller';
import { validate } from '../middleware/validation.middleware';
import { createStudentSchema, updateStudentSchema } from '../schemas/student.schema';
import { progressSchema } from '../schemas/progress.schema';

const router = Router();

router.post('/', validate(createStudentSchema), createStudent);
router.get('/', listStudents);
router.get('/:id', getStudent);
router.put('/:id', validate(updateStudentSchema), updateStudent);

router.post('/:studentId/progress', validate(progressSchema), saveProgress);
router.put('/:studentId/progress', validate(progressSchema), saveProgress);
router.get('/:studentId/progress', getProgress);

export default router;
