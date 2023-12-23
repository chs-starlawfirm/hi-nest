/*
  Warnings:

  - You are about to drop the column `last_login` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `sign_in` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `update` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,phone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `detail_address` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "last_login",
DROP COLUMN "sign_in",
DROP COLUMN "update",
ADD COLUMN     "auth" TEXT NOT NULL DEFAULT '고객',
ADD COLUMN     "detail_address" TEXT NOT NULL,
ADD COLUMN     "last_login_at" DATE,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "sign_in_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" DATE;

-- CreateTable
CREATE TABLE "Log" (
    "logId" BIGSERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT '가입',
    "time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("logId")
);

-- CreateIndex
CREATE INDEX "Log_status_idx" ON "Log"("status");

-- CreateIndex
CREATE INDEX "brin_index_on_time" ON "Log" USING BRIN ("time");

-- CreateIndex
CREATE INDEX "Users_address_idx" ON "Users"("address");

-- CreateIndex
CREATE INDEX "brin_index_on_sign_in_at" ON "Users" USING BRIN ("sign_in_at");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_phone_key" ON "Users"("email", "phone");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
