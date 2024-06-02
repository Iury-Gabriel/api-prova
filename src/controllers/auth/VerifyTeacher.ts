import { Request, Response } from 'express';
import { verifyTeacherByEmail } from '../../services/auth/VerifyTeacher';

const verifyTeacher = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const isTeacher = await verifyTeacherByEmail(email);
        res.status(200).json({ isTeacher });
    } catch (error) {
        console.error('Erro ao verificar o professor:', error);
        res.status(500).json({ message: 'Erro ao verificar o professor' });
    }
};

export { verifyTeacher };
