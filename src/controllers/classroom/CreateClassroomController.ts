import { Request, Response } from "express";
import { CreateClassroomService } from "../../services/classroom/CreateClassroomService"


const CreateClassroomController = async (req: Request, res: Response) => {
    const { sala } = req.body;

    const exam = await CreateClassroomService({
        classroom: sala,
    });

    return res.json(exam);
}

export { CreateClassroomController }