import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const ListAllExamsService = async () => {
    const exams = await prismaClient.exam.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            examDate: true,
            classroom: {
                select: {
                    name: true
                }
            }
        }
    });

    return exams;
}

export { ListAllExamsService };
