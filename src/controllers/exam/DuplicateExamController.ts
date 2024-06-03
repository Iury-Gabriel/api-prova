import { Request, Response } from "express";
import { DuplicateExamService } from "../../services/exam/DuplicateExamService";

const DuplicateExamController = async (req: Request, res: Response) => {
    const { examId } = req.params;

    try {
        const duplicatedExam = await DuplicateExamService({ examId: Number(examId) });

        return res.json(duplicatedExam);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

export { DuplicateExamController };
