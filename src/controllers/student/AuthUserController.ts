import { Request, Response } from "express";
import { AuthUserService } from "../../services/student/AuthUserService"


const AuthUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await AuthUserService({
        email,
        password,
    });

    return res.json(user);
}

export { AuthUserController }