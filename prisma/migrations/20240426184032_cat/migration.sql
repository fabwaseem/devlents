/*
  Warnings:

  - Made the column `categoryId` on table `component` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `component` DROP FOREIGN KEY `Component_categoryId_fkey`;

-- AlterTable
ALTER TABLE `component` MODIFY `categoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
