import { Request, Response } from "express";
import { GetExamService } from "../../services/exam/GetExamService";

const GetExamController = async (req: Request, res: Response) => {
    const { examId } = req.params;

    try {
        const exam = await GetExamService(Number(examId));
        return res.json(exam);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { GetExamController };
