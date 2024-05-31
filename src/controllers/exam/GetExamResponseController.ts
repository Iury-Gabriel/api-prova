import { Request, Response } from "express";
import { GetExamResponseService } from "../../services/exam/GetExamResponseService";

const GetExamResponseController = async (req: Request, res: Response) => {
    const { studentId, examId } = req.params;

    try {
        const examResponse = await GetExamResponseService(Number(studentId), Number(examId));
        return res.json(examResponse);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { GetExamResponseController };
