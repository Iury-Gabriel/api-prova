import { Request, Response } from "express";
import { CreateExamService } from "../../services/exam/CreateExamService"


const CreateExamController = async (req: Request, res: Response) => {
    const { title, classroomName, description, fileHTML, applicationDate } = req.body;

    const exam = await CreateExamService({
        title,
        classroomName,
        description,
        fileHTML,
        applicationDate
    });

    return res.json(exam);
}

export { CreateExamController }