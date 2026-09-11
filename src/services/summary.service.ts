import { PrismaClient, ProgressStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const summaryService = {
  async get() {
    const [totalStudents, completed, inProgress, notStarted] = await Promise.all([
      prisma.student.count(),
      prisma.student.count({
        where: {
          progresses: {
            some: { status: ProgressStatus.COMPLETED },
          },
        },
      }),
      prisma.student.count({
        where: {
          progresses: {
            some: { status: ProgressStatus.IN_PROGRESS },
          },
        },
      }),
      prisma.student.count({
        where: {
          OR: [
            { progresses: { none: {} } },
            {
              progresses: {
                every: { status: ProgressStatus.NOT_STARTED },
              },
            },
          ],
        },
      }),
    ]);

    return {
      totalStudents,
      completed,
      inProgress,
      notStarted,
    };
  },
};
