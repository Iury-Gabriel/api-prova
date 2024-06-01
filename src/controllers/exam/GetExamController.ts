import { Request, Response } from "express";
import { GetExamService } from "../../services/exam/GetExamService";

const GetExamController = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Exam ID is required" });
    }

    const examIdNumber = parseInt(id);

    try {
        const exam = await GetExamService(examIdNumber);
        return res.json(exam);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { GetExamController };
