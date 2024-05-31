import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

type ClassroomRequest = {
    classroom: string;
}

const CreateClassroomService = async ({ classroom }: ClassroomRequest) => {
    if (classroom === "") {
        throw new Error("All fields must be filled");
    }

    const classroomCreated = await prismaClient.classroom.create({
        data: {
            name: classroom
        }
    });

    return classroomCreated;
}

export { CreateClassroomService }
