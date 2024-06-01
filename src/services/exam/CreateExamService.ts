import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

type ExamRequest = {
    title: string;
    classroomName: string;
    description?: string;
    applicationDate: string;
    questions: any[]; // Adicionando um campo para as perguntas
}

const CreateExamService = async ({ title, classroomName, description, applicationDate, questions }: ExamRequest) => {
    if (title === "" || classroomName === "" || applicationDate === "" || questions.length === 0) {
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

    const exam = await prismaClient.exam.create({
        data: {
            title: title,
            description: description,
            examDate: applicationDate,
            classroomId: classroom.id,
            questions: questions
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

    return exam;
}

export { CreateExamService }
