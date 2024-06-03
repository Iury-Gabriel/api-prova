import { PrismaClient, Prisma } from "@prisma/client";

const prismaClient = new PrismaClient();

type DuplicateExamRequest = {
    examId: number;
};

const DuplicateExamService = async ({ examId }: DuplicateExamRequest) => {
    // Fetch the existing exam and its details
    const existingExam = await prismaClient.exam.findUnique({
        where: { id: examId },
        select: {
            id: true,
            title: true,
            description: true,
            examDate: true,
            classroomId: true,
            questions: true
        }
    });

    if (!existingExam) {
        throw new Error("Exam not found");
    }

    const duplicatedExam = await prismaClient.exam.create({
        data: {
            title: `${existingExam.title} (Copy)`,
            description: existingExam.description,
            examDate: existingExam.examDate,
            classroomId: existingExam.classroomId,
            questions: existingExam.questions as Prisma.InputJsonObject
        },
        select: {
            id: true,
            title: true,
            description: true,
            examDate: true,
            classroom: {
                select: {
                    name: true
                }
            },
            questions: true
        }
    });

    return duplicatedExam;
};

export { DuplicateExamService };
