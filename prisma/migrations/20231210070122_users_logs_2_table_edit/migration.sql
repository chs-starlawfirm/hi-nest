/*
  Warnings:

  - You are about to drop the column `sign_in_at` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_fkey";

-- DropIndex
DROP INDEX "brin_index_on_sign_in_at";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "sign_in_at",
ADD COLUMN     "create_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Log";

-- CreateTable
CREATE TABLE "Logs" (
    "logId" BIGSERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT '가입',
    "time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("logId")
);

-- CreateIndex
CREATE INDEX "Logs_status_idx" ON "Logs"("status");

-- CreateIndex
CREATE INDEX "brin_index_on_time" ON "Logs" USING BRIN ("time");

-- CreateIndex
CREATE INDEX "brin_index_on_create_at" ON "Users" USING BRIN ("create_at");

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
