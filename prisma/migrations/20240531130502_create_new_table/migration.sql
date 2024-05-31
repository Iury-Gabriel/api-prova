/*
  Warnings:

  - You are about to drop the column `arquivoHTML` on the `Prova` table. All the data in the column will be lost.
  - You are about to drop the column `sala` on the `Prova` table. All the data in the column will be lost.
  - You are about to alter the column `dataAplicacao` on the `Prova` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `sala` on the `Aluno` table. All the data in the column will be lost.
  - Added the required column `salaId` to the `Prova` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaId` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pergunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enunciado" TEXT NOT NULL,
    "provaId" INTEGER NOT NULL,
    CONSTRAINT "Pergunta_provaId_fkey" FOREIGN KEY ("provaId") REFERENCES "Prova" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alternativa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL,
    "perguntaId" INTEGER NOT NULL,
    CONSTRAINT "Alternativa_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "Pergunta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prova" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataAplicacao" DATETIME NOT NULL,
    "salaId" INTEGER NOT NULL,
    CONSTRAINT "Prova_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prova" ("dataAplicacao", "descricao", "id", "titulo") SELECT "dataAplicacao", "descricao", "id", "titulo" FROM "Prova";
DROP TABLE "Prova";
ALTER TABLE "new_Prova" RENAME TO "Prova";
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "salaId" INTEGER NOT NULL,
    CONSTRAINT "Aluno_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("email", "id", "nome", "senha") SELECT "email", "id", "nome", "senha" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
PRAGMA foreign_key_check("Prova");
PRAGMA foreign_key_check("Aluno");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");
