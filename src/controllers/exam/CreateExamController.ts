import { Request, Response } from "express";
import { CreateExamService } from "../../services/exam/CreateExamService";

const CreateExamController = async (req: Request, res: Response) => {
    const { title, classroomName, description, applicationDate, questions } = req.body;

    try {
        const exam = await CreateExamService({
            title,
            classroomName,
            description,
            applicationDate,
            questions
        });

        return res.json(exam);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { CreateExamController };
