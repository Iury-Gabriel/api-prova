import { Request, Response } from "express";
import { CreateUserService } from "../../services/student/CreateUserService";


const CreateUserController = async (req: Request, res: Response) => {
    const { name, email, password, classroom } = req.body;

    const user = await CreateUserService({
        name,
        email,
        password,
        classroomName: classroom
    });

    return res.json(user);
}

export { CreateUserController }