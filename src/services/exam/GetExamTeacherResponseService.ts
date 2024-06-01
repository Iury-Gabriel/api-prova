import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const GetExamTeacherResponseService = async (studentId: number, examId: number) => {
    const examResponse = await prismaClient.examResponse.findFirst({
        where: {
            studentId: studentId,
            id: examId
        }
    });

    return examResponse;
}

export { GetExamTeacherResponseService };
