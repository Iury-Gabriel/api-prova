import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";

const prismaClient = new PrismaClient();

type UserRequest = {
    email: string;
    password: string;
}

const AuthUserService = async ({ email, password }: UserRequest) => {
    const user = await prismaClient.student.findFirst({
        where: {
            email: email
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            classroom: true
        }
    })

    if(!user) {
        throw new Error("User or password incorrect")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch) {
        throw new Error("User or password incorrect")
    }

    const token = sign(
        {
            name: user.name,
            email: user.email,
            sub: user.id
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '30d'
        }
    )

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        sala: user.classroom,
        token: token
    }
}

export { AuthUserService }