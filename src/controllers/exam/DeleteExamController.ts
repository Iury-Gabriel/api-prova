import { Request, Response } from "express";
import { DeleteExamService } from "../../services/exam/DeleteExamService";

const DeleteExamController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await DeleteExamService(Number(id));
        return res.json(result);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { DeleteExamController };
