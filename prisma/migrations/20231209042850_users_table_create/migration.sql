-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "sign_in" TIMESTAMP(3) NOT NULL,
    "update" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Users_name_idx" ON "Users"("name");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");
