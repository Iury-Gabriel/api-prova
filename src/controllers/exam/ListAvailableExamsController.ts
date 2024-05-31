import { Request, Response } from "express";
import { ListAvailableExamsService } from "../../services/exam/ListAvailableExamsService";

const ListAvailableExamsController = async (req: Request, res: Response) => {
    const { studentId } = req.params;

    try {
        const exams = await ListAvailableExamsService(Number(studentId));
        return res.json(exams);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { ListAvailableExamsController };
