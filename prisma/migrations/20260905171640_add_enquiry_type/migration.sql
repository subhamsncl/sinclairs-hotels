-- CreateEnum
CREATE TYPE "EnquiryType" AS ENUM ('GENERAL', 'HOTEL', 'WEDDING', 'MEETINGS');

-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "type" "EnquiryType" NOT NULL DEFAULT 'GENERAL';
