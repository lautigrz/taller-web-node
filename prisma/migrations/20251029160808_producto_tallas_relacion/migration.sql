/*
  Warnings:

  - You are about to drop the column `nombre` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `nombre`,
    DROP COLUMN `stock`,
    ADD COLUMN `cantidad` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL DEFAULT 'Sin titulo';

-- CreateTable
CREATE TABLE `Talla` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `talla` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductoTallas` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductoTallas_AB_unique`(`A`, `B`),
    INDEX `_ProductoTallas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductoTallas` ADD CONSTRAINT `_ProductoTallas_A_fkey` FOREIGN KEY (`A`) REFERENCES `Producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductoTallas` ADD CONSTRAINT `_ProductoTallas_B_fkey` FOREIGN KEY (`B`) REFERENCES `Talla`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
