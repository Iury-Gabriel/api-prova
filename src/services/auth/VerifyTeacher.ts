import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const verifyTeacherByEmail = async (email: string) => {
    try {
        const teacher = await prisma.teacher.findUnique({
            where: {
                email: email,
            },
        });

        return !!teacher; // Retorna true se encontrar o professor, senão retorna false
    } catch (error) {
        throw error;
    }
};

export { verifyTeacherByEmail };
