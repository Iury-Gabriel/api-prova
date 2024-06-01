import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

type ExamResponseRequest = {
    studentId: number;
    examId: number;
    classroomId: number;
    responses: any; // JSON
    cheated: boolean;
}

const CreateExamResponseService = async ({ studentId, examId, classroomId, responses, cheated }: ExamResponseRequest) => {
    if (!studentId || !examId || !classroomId || !responses) {
        throw new Error("All fields must be filled");
    }

    const existingExamResponse = await prismaClient.examResponse.findMany({
        where: {
            studentId: studentId,
            examId: examId
        }
    });

    if (existingExamResponse.length > 0) {
        throw new Error("Exam response already exists");
    }

    const examResponse = await prismaClient.examResponse.create({
        data: {
            studentId: studentId,
            examId: examId,
            classroomId: classroomId,
            responses: responses,
            cheated: cheated
        },
        select: {
            id: true,
            student: {
                select: {
                    name: true
                }
            },
            exam: {
                select: {
                    title: true
                }
            },
            classroom: {
                select: {
                    name: true
                }
            },
            responses: true,
            submittedAt: true,
            cheated: true
        }
    });

    return examResponse;
}

export { CreateExamResponseService };
