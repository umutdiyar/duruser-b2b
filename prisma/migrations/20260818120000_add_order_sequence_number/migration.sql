-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "sequenceNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_sequenceNumber_key" ON "Order"("sequenceNumber");
