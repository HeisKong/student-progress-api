import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/error.middleware';

const prisma = new PrismaClient();

type StudentInput = {
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
};

type StudentUpdate = Partial<StudentInput>;

export const studentService = {
  async create(data: StudentInput) {
    return prisma.student.create({ data });
  },

  async list() {
    return prisma.student.findMany({
      orderBy: { id: 'asc' },
    });
  },

  async getById(id: number) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        progresses: {
          orderBy: { updatedAt: 'desc' },
        },
      },
    });

    if (!student) {
      throw new AppError(404, 'Student not found');
    }

    return student;
  },

  async update(id: number, data: StudentUpdate) {
    await studentService.getById(id);

    return prisma.student.update({
      where: { id },
      data,
    });
  },
};
