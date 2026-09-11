import { PrismaClient, ProgressStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const students = [
    { studentCode: '65010001', firstName: 'John', lastName: 'Doe', email: 'john@example.com', status: ProgressStatus.COMPLETED },
    { studentCode: '65010002', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', status: ProgressStatus.IN_PROGRESS },
    { studentCode: '65010003', firstName: 'Alex', lastName: 'Brown', email: 'alex@example.com', status: ProgressStatus.NOT_STARTED },
  ];

  for (const item of students) {
    const student = await prisma.student.upsert({
      where: { email: item.email },
      update: {},
      create: { studentCode: item.studentCode, firstName: item.firstName, lastName: item.lastName, email: item.email },
    });
    await prisma.progress.create({ data: { studentId: student.id, status: item.status } });
  }
}

main().finally(() => prisma.$disconnect());
