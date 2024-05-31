import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

const prismaClient = new PrismaClient();

type TeacherRequest = {
    name: string;
    email: string;
    password: string;
}

const CreateTeacherService = async ({ name, email, password }: TeacherRequest) => {
    if (!email) {
        throw new Error("Incorrect email");
    }

    const teacherAlreadyExists = await prismaClient.teacher.findFirst({
        where: {
            email: email
        }
    });

    if (teacherAlreadyExists) {
        throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const teacher = await prismaClient.teacher.create({
        data: {
            name: name,
            email: email,
            password: passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    return teacher;
}

export { CreateTeacherService }