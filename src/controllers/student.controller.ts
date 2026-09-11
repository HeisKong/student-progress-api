import { Request, Response, NextFunction } from 'express';
import { studentService } from '../services/student.service';

export async function createStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const student = await studentService.create(req.body);

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
}

export async function listStudents(_req: Request, res: Response, next: NextFunction) {
  try {
    const students = await studentService.list();

    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
}

export async function getStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = Number(req.params.id);
    const student = await studentService.getById(studentId);

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = Number(req.params.id);
    const student = await studentService.update(studentId, req.body);

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
}
