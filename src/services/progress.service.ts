import { PrismaClient, ProgressStatus } from '@prisma/client';
import { AppError } from '../middleware/error.middleware';

const prisma = new PrismaClient();

async function ensureStudentExists(studentId: number) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    throw new AppError(404, 'Student not found');
  }
}

export const progressService = {
  async createOrUpdate(studentId: number, status: ProgressStatus) {
    await ensureStudentExists(studentId);

    const latestProgress = await prisma.progress.findFirst({
      where: { studentId },
      orderBy: { updatedAt: 'desc' },
    });

    if (latestProgress) {
      return prisma.progress.update({
        where: { id: latestProgress.id },
        data: { status },
      });
    }

    return prisma.progress.create({
      data: {
        studentId,
        status,
      },
    });
  },

  async getByStudent(studentId: number) {
    await ensureStudentExists(studentId);

    return prisma.progress.findMany({
      where: { studentId },
      orderBy: { updatedAt: 'desc' },
    });
  },
};
