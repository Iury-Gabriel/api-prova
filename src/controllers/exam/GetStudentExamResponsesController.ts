import { Request, Response } from "express";
import { GetStudentExamResponsesService } from "../../services/exam/GetStudentExamResponsesService";

const GetStudentExamResponsesController = async (req: Request, res: Response) => {
    const { studentId, classroomId } = req.params;

    try {
        const responses = await GetStudentExamResponsesService(Number(studentId), Number(classroomId));
        return res.json(responses);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { GetStudentExamResponsesController };
