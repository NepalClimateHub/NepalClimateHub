/*
  Warnings:

  - You are about to drop the column `image` on the `Volunteer` table. All the data in the column will be lost.
  - Added the required column `profilePicture` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questions` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "image",
ADD COLUMN     "profilePicture" TEXT NOT NULL,
ADD COLUMN     "questions" TEXT NOT NULL;
