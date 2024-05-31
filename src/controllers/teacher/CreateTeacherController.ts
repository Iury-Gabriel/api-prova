import { Request, Response } from "express";
import { CreateTeacherService } from "../../services/teacher/CreateTeacherService"


const CreateTeacherController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const teacher = await CreateTeacherService({
        name,
        email,
        password,
    });

    return res.json(teacher);
}

export { CreateTeacherController }