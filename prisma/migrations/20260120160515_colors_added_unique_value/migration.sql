/*
  Warnings:

  - A unique constraint covering the columns `[name,store_id,value]` on the table `colors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "colors_name_store_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "colors_name_store_id_value_key" ON "colors"("name", "store_id", "value");
