-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "legacyTicket" TEXT,
ADD COLUMN     "userIp" TEXT;

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "voucherNo" SERIAL NOT NULL,
    "viewToken" TEXT NOT NULL,
    "hotelSlug" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "travelAgentName" TEXT,
    "travelAgentPan" TEXT,
    "travelAgentGstin" TEXT,
    "travelAgentState" TEXT,
    "commissionPct" DECIMAL(5,2),
    "tdsPct" DECIMAL(5,2),
    "rooms" INTEGER NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "rate" DECIMAL(10,2) NOT NULL,
    "taxes" DECIMAL(10,2) NOT NULL,
    "depositAmount" DECIMAL(10,2),
    "depositReceiptNo" TEXT,
    "depositReceiptDate" TIMESTAMP(3),
    "billingInstructions" TEXT,
    "arrivalDetails" TEXT,
    "otherServices" TEXT,
    "specialInstructions" TEXT,
    "issuerName" TEXT NOT NULL,
    "issuerPhone" TEXT NOT NULL,
    "bookingOffice" TEXT NOT NULL,
    "legacyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ip" TEXT,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_voucherNo_key" ON "Voucher"("voucherNo");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_viewToken_key" ON "Voucher"("viewToken");

-- CreateIndex
CREATE INDEX "Voucher_hotelSlug_idx" ON "Voucher"("hotelSlug");

-- CreateIndex
CREATE INDEX "Voucher_createdAt_idx" ON "Voucher"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");
