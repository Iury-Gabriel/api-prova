import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

const prismaClient = new PrismaClient();

type UserRequest = {
    name: string;
    email: string;
    password: string;
    classroomName: string;
}

const CreateUserService = async ({ name, email, password, classroomName }: UserRequest) => {
    if (!email) {
        throw new Error("Incorrect email");
    }

    const userAlreadyExists = await prismaClient.student.findFirst({
        where: {
            email: email
        }
    });

    if (userAlreadyExists) {
        throw new Error("User already exists");
    }

    const classroom = await prismaClient.classroom.findFirst({
        where: {
            name: classroomName
        }
    });

    if (!classroom) {
        throw new Error("Classroom not found");
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await prismaClient.student.create({
        data: {
            name: name,
            email: email,
            password: passwordHash,
            classroomId: classroom.id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    return user;
}

export { CreateUserService }