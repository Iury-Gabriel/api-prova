import { Request, Response, Router } from 'express';
import { CreateUserController } from "./controllers/student/CreateUserController"
import { AuthUserController } from './controllers/student/AuthUserController';
import { CreateExamController } from './controllers/exam/CreateExamController';
import { ListExamsController } from './controllers/exam/ListExamsController';
import { SendExamController } from './controllers/exam/SendExamController';
import { ResetExamController } from './controllers/exam/ResetExamController';
import { CreateClassroomController } from './controllers/classroom/CreateClassroomController';
import { CreateTeacherController } from './controllers/teacher/CreateTeacherController';
import { AuthTeacherController } from './controllers/teacher/AuthTeacherController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({ pong: true });
})

router.post('/register/student', CreateUserController)
router.post('/login/student', AuthUserController)
router.post('/register/teacher', CreateTeacherController)
router.post('/login/teacher', AuthTeacherController)

router.post('/provas', CreateExamController)
router.get('/provas', ListExamsController)

router.post('/enviar-resposta', SendExamController)
router.post('/reiniciarProva', ResetExamController)

router.post('/classroom', CreateClassroomController)

export { router }