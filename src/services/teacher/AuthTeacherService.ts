import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";

const prismaClient = new PrismaClient();

type TeacherRequest = {
    email: string;
    password: string;
}

const AuthTeacherService = async ({ email, password }: TeacherRequest) => {
    const teacher = await prismaClient.teacher.findFirst({
        where: {
            email: email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        }
    })

    if(!teacher) {
        throw new Error("User or password incorrect")
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password)

    if(!passwordMatch) {
        throw new Error("User or password incorrect")
    }

    const token = sign(
        {
            name: teacher.name,
            email: teacher.email,
            sub: teacher.id
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '30d'
        }
    )

    return {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        token: token
    }
}

export { AuthTeacherService }