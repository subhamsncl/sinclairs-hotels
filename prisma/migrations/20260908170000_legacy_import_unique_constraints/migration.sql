-- Needed so the one-time legacy data import (scripts/migrate-legacy-data.ts)
-- is safely re-runnable: createMany({ skipDuplicates: true }) only skips rows
-- that violate a unique constraint, and both fields are otherwise plain
-- optional columns with no such constraint.
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_legacyTicket_key" UNIQUE ("legacyTicket");
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_legacyId_key" UNIQUE ("legacyId");
