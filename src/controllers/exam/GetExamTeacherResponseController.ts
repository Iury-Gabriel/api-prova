import { Request, Response } from "express";
import { GetExamTeacherResponseService } from "../../services/exam/GetExamTeacherResponseService";

const GetExamTeacherResponseController = async (req: Request, res: Response) => {
    const { studentId, examId } = req.params;

    try {
        const examResponse = await GetExamTeacherResponseService(Number(studentId), Number(examId));
        return res.json(examResponse);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { GetExamTeacherResponseController };
