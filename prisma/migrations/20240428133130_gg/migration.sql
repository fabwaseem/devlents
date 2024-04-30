/*
  Warnings:

  - You are about to drop the column `totalFavourites` on the `component` table. All the data in the column will be lost.
  - You are about to drop the column `totalUpvotes` on the `component` table. All the data in the column will be lost.
  - You are about to drop the column `totalLents` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `component` DROP COLUMN `totalFavourites`,
    DROP COLUMN `totalUpvotes`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `totalLents`;
