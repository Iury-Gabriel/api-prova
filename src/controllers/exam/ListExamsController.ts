import { Request, Response } from "express";
import { ListExamsService } from "../../services/exam/ListExamsService"


const ListExamsController = async (req: Request, res: Response) => {
    const { sala } = req.body;

    const exams = await ListExamsService({
        classroomName: sala
    });

    return res.json(exams);
}

export { ListExamsController }