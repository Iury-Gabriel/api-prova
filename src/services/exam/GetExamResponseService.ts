import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const GetExamResponseService = async (studentId: number, examId: number) => {
    const examResponse = await prismaClient.examResponse.findFirst({
        where: {
            studentId: studentId,
            examId: examId
        }
    });

    return examResponse;
}

export { GetExamResponseService };
