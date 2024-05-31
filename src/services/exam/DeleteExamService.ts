import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const DeleteExamService = async (id: number) => {
    const existingExam = await prismaClient.exam.findUnique({
        where: {
            id: id
        }
    });

    if (!existingExam) {
        throw new Error("Exam not found");
    }

    await prismaClient.exam.delete({
        where: {
            id: id
        }
    });

    return { message: "Exam deleted successfully" };
}

export { DeleteExamService };
