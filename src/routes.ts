import express from 'express';
import { CreateExamController } from './controllers/exam/CreateExamController';
import { CreateExamResponseController } from './controllers/exam/CreateExamResponseController';
import { AuthUserController } from './controllers/student/AuthUserController';
import { CreateUserController } from './controllers/student/CreateUserController';
import { AuthTeacherController } from './controllers/teacher/AuthTeacherController';
import { CreateTeacherController } from './controllers/teacher/CreateTeacherController';
import { GetExamController } from './controllers/exam/GetExamController';
import { DeleteExamController } from './controllers/exam/DeleteExamController';
import { UpdateExamController } from './controllers/exam/UpdateExamController';
import { ListAvailableExamsController } from './controllers/exam/ListAvailableExamsController';
import { ListAllExamsController } from './controllers/exam/ListAllExamsController';
import { ListStudentsInClassroomController } from './controllers/classroom/ListStudentsInClassroomController';
import { GetStudentExamResponsesController } from './controllers/exam/GetStudentExamResponsesController';
import { GetExamResponseController } from './controllers/exam/GetExamResponseController';
import { ValidateTokenController } from './controllers/auth/ValidateTokenController'; // Novo controlador
import { isAuthenticated } from './middlewares/isAuthenticated';
import { GetExamTeacherResponseController } from './controllers/exam/GetExamTeacherResponseController';
import { verifyTeacher } from './controllers/auth/VerifyTeacher';

const router = express.Router();

// Rotas de autenticação
router.post('/student/login', AuthUserController);
router.post('/student/register', CreateUserController);
router.post('/teacher/login', AuthTeacherController);
router.post('/teacher/register', CreateTeacherController);
router.get('/auth/validate-token', isAuthenticated, ValidateTokenController); // Nova rota de validação de token
router.post('/verify-teacher', verifyTeacher);

// Rotas de provas para estudantes
router.get('/student/:studentId/available-exams', ListAvailableExamsController); // Listar provas disponíveis para a sala do estudante
router.get('/student/exams/:id', GetExamController); // Obter detalhes de uma prova específica
router.post('/student/exam-responses', CreateExamResponseController); // Enviar respostas da prova
router.get('/student/:studentId/exam/:examId/response', GetExamResponseController); // Verificar respostas de provas de um estudante

// Rotas de provas para professores
router.get('/teacher/exams', ListAllExamsController); // Listar todas as provas criadas
router.post('/teacher/exams', CreateExamController); // Criar uma nova prova
router.put('/teacher/exams/:id', UpdateExamController); // Atualizar uma prova existente
router.delete('/teacher/exams/:id', DeleteExamController); // Apagar uma prova existente
router.get('/teacher/:studentId/exam/:examId/response', GetExamTeacherResponseController);

// Rotas de sala de aula
router.get('/classroom/:classroomId/students', ListStudentsInClassroomController); // Listar alunos em uma sala específica

// Rotas de respostas dos alunos
router.get('/classroom/:classroomId/student/:studentId/exam-responses', GetStudentExamResponsesController); // Visualizar respostas das provas por aluno em uma sala específica

export { router };
