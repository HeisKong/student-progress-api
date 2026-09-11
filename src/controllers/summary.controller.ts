import { Request, Response, NextFunction } from 'express';
import { summaryService } from '../services/summary.service';

export async function getSummary(_req: Request, res: Response, next: NextFunction) {
  try {
    const summary = await summaryService.get();

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}
