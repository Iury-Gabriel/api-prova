import { Request, Response } from "express";
import { UpdateExamService } from "../../services/exam/UpdateExamService";

const UpdateExamController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, examDate, classroomName, questions } = req.body;

    try {
        const updatedExam = await UpdateExamService({
            id: Number(id),
            title,
            description,
            examDate,
            classroomName,
            questions
        });

        return res.json(updatedExam);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { UpdateExamController };
