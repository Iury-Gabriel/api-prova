import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const GetExamService = async (examId: number) => {
    const exam = await prismaClient.exam.findUnique({
        where: {
            id: examId
        },
        select: {
            id: true,
            title: true,
            description: true,
            examDate: true,
            questions: true,
            classroom: {
                select: {
                    name: true
                }
            }
        }
    });

    if (!exam) {
        throw new Error("Exam not found");
    }

    return exam;
}

export { GetExamService };
