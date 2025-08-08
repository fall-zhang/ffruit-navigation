/*
  Warnings:

  - You are about to drop the column `subGroup` on the `NavCategory` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createTime` to the `NavCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `NavCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentId` to the `NavCategory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `NavLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `accessState` on the `NavLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LinkState" AS ENUM ('CHECK', 'REJECT', 'PASS');

-- CreateEnum
CREATE TYPE "LinkAccessState" AS ENUM ('NORMAL', 'PROXY', 'DEACTIVATE');

-- AlterTable
ALTER TABLE "NavCategory" DROP COLUMN "subGroup",
ADD COLUMN     "createTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "parentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NavLink" DROP COLUMN "status",
ADD COLUMN     "status" "LinkState" NOT NULL,
DROP COLUMN "accessState",
ADD COLUMN     "accessState" "LinkAccessState" NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "_NavCategoryToNavLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NavCategoryToNavLink_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NavCategoryToNavLink_B_index" ON "_NavCategoryToNavLink"("B");

-- AddForeignKey
ALTER TABLE "_NavCategoryToNavLink" ADD CONSTRAINT "_NavCategoryToNavLink_A_fkey" FOREIGN KEY ("A") REFERENCES "NavCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NavCategoryToNavLink" ADD CONSTRAINT "_NavCategoryToNavLink_B_fkey" FOREIGN KEY ("B") REFERENCES "NavLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
