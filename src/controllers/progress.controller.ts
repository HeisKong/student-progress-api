import { Request, Response, NextFunction } from 'express';
import { progressService } from '../services/progress.service';

export async function saveProgress(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = Number(req.params.studentId);
    const progress = await progressService.createOrUpdate(studentId, req.body.status);

    res.status(201).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProgress(req: Request, res: Response, next: NextFunction) {
  try {
    const studentId = Number(req.params.studentId);
    const progress = await progressService.getByStudent(studentId);

    res.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    next(error);
  }
}
