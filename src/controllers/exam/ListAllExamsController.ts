import { Request, Response } from "express";
import { ListAllExamsService } from "../../services/exam/ListAllExamsService";

const ListAllExamsController = async (req: Request, res: Response) => {
    try {
        const exams = await ListAllExamsService();
        return res.json(exams);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { ListAllExamsController };
