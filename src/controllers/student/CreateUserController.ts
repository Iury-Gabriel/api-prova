import { Request, Response } from "express";
import { CreateUserService } from "../../services/student/CreateUserService";


const CreateUserController = async (req: Request, res: Response) => {
    const { name, email, password, sala } = req.body;

    const user = await CreateUserService({
        name,
        email,
        password,
        classroomName: sala
    });

    return res.json(user);
}

export { CreateUserController }