-- DropForeignKey
ALTER TABLE "ExamResponse" DROP CONSTRAINT "ExamResponse_examId_fkey";

-- AddForeignKey
ALTER TABLE "ExamResponse" ADD CONSTRAINT "ExamResponse_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
