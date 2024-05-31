import { Request, Response } from "express";
import { CreateExamResponseService } from "../../services/exam/CreateExamResponseService";

const CreateExamResponseController = async (req: Request, res: Response) => {
    const { studentId, examId, classroomId, responses, cheated } = req.body;

    try {
        const examResponse = await CreateExamResponseService({
            studentId,
            examId,
            classroomId,
            responses,
            cheated
        });

        return res.json(examResponse);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { CreateExamResponseController };
