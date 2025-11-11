/*
  Warnings:

  - You are about to alter the column `genero` on the `producto` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Made the column `descripcion` on table `producto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `producto` ADD COLUMN `habilitado` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `descripcion` VARCHAR(191) NOT NULL,
    MODIFY `genero` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `rol` ENUM('CLIENTE', 'ADMIN') NOT NULL DEFAULT 'CLIENTE';

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('PENDIENTE', 'PAGADO', 'ENVIADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
    `total` DECIMAL(10, 2) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoProducto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `talla` VARCHAR(191) NOT NULL,
    `precioUnitario` DECIMAL(10, 2) NOT NULL,

    UNIQUE INDEX `PedidoProducto_pedidoId_productoId_talla_key`(`pedidoId`, `productoId`, `talla`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
