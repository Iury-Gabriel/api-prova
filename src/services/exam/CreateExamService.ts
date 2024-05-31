import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

type ExamRequest = {
    title: string;
    classroomName: string;
    description?: string;
    fileHTML: string;
    applicationDate: string;
    questions: any[]; // Adicionando um campo para as perguntas
}

const CreateExamService = async ({ title, classroomName, description, fileHTML, applicationDate, questions }: ExamRequest) => {
    if (title === "" || classroomName === "" || fileHTML === "" || applicationDate === "") {
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
            examDate: new Date(applicationDate),
            classroomId: classroom.id,
            questions: questions // Assumindo que 'questions' já está formatado como JSON
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
