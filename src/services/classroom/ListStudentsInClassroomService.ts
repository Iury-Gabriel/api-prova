import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const ListStudentsInClassroomService = async (classroomId: number) => {
    const students = await prismaClient.student.findMany({
        where: {
            classroomId: classroomId
        },
        select: {
            id: true,
            name: true
        }
    });

    return students;
}

export { ListStudentsInClassroomService };
