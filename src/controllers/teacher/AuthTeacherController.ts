import { Request, Response } from "express";
import { AuthTeacherService } from "../../services/teacher/AuthTeacherService"


const AuthTeacherController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const teacher = await AuthTeacherService({
        email,
        password,
    });

    return res.json(teacher);
}

export { AuthTeacherController }