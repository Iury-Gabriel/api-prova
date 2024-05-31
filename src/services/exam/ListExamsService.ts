import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

type ExamRequest = {
    classroomName: string;
}

const ListExamsService = async ({ classroomName }: ExamRequest) => {
    if (classroomName === "") {
        throw new Error("All fields must be filled");
    }

    const classroom = await prismaClient.classroom.findFirst({
        where: {
            name: classroomName
        }
    });

    if (!classroom) {
        throw new Error("Classroom not found");
    }

    const exams = await prismaClient.exam.findMany({
        where: {
            classroomId: classroom.id
        }
    });

    return exams;
}

export { ListExamsService }
