import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

type UpdateExamRequest = {
    id: number;
    title?: string;
    description?: string;
    examDate?: string;
    questions?: any; // Assuming questions are stored as JSON
}

const UpdateExamService = async ({ id, title, description, examDate, questions }: UpdateExamRequest) => {
    // Find the exam to update
    const existingExam = await prismaClient.exam.findUnique({
        where: {
            id: id
        }
    });

    if (!existingExam) {
        throw new Error("Exam not found");
    }

    // Update the exam
    const updatedExam = await prismaClient.exam.update({
        where: {
            id: id
        },
        data: {
            title: title || existingExam.title,
            description: description || existingExam.description,
            examDate: examDate ? examDate : existingExam.examDate,
            questions: questions || existingExam.questions
        }
    });

    return updatedExam;
}

export { UpdateExamService };
