import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const ListAvailableExamsService = async (studentId: number) => {
    const student = await prismaClient.student.findUnique({
        where: {
            id: studentId
        },
        select: {
            classroomId: true
        }
    });

    if (!student) {
        throw new Error("Student not found");
    }

    const exams = await prismaClient.exam.findMany({
        where: {
            classroomId: student.classroomId
        },
        select: {
            id: true,
            title: true,
            description: true,
            examDate: true
        }
    });

    return exams;
}

export { ListAvailableExamsService };
