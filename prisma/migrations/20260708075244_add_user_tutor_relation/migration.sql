/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `tutorProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `tutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tutorProfile" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tutorProfile_userId_key" ON "tutorProfile"("userId");

-- AddForeignKey
ALTER TABLE "tutorProfile" ADD CONSTRAINT "tutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
