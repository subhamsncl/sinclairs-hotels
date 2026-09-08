-- CreateEnum
CREATE TYPE "PaymentGateway" AS ENUM ('CCAVENUE', 'ICICI');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "gateway" "PaymentGateway" NOT NULL DEFAULT 'CCAVENUE';
