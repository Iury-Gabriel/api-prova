import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const GetStudentExamResponsesService = async (studentId: number, classroomId: number) => {
    const responses = await prismaClient.examResponse.findMany({
        where: {
            studentId: studentId,
            classroomId: classroomId
        },
        include: {
            exam: {
                select: {
                    title: true,
                    description: true
                }
            },
            student: {
                select: {
                    name: true
                }
            }
        }
    });

    return responses;
}

export { GetStudentExamResponsesService };
