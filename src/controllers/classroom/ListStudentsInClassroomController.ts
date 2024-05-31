import { Request, Response } from "express";
import { ListStudentsInClassroomService } from "../../services/classroom/ListStudentsInClassroomService";

const ListStudentsInClassroomController = async (req: Request, res: Response) => {
    const { classroomId } = req.params;

    try {
        const students = await ListStudentsInClassroomService(Number(classroomId));
        return res.json(students);
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { ListStudentsInClassroomController };
