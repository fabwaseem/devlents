/*
  Warnings:

  - You are about to drop the column `favourites` on the `component` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `component` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `component` DROP COLUMN `favourites`,
    DROP COLUMN `upvotes`,
    ADD COLUMN `totalFavourites` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalUpvotes` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `_FavouriteComps` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FavouriteComps_AB_unique`(`A`, `B`),
    INDEX `_FavouriteComps_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UpvotedComps` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UpvotedComps_AB_unique`(`A`, `B`),
    INDEX `_UpvotedComps_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FavouriteComps` ADD CONSTRAINT `_FavouriteComps_A_fkey` FOREIGN KEY (`A`) REFERENCES `Component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FavouriteComps` ADD CONSTRAINT `_FavouriteComps_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UpvotedComps` ADD CONSTRAINT `_UpvotedComps_A_fkey` FOREIGN KEY (`A`) REFERENCES `Component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UpvotedComps` ADD CONSTRAINT `_UpvotedComps_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
