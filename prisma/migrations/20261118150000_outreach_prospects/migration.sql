-- CreateEnum
CREATE TYPE "OutreachChannel" AS ENUM ('WHATSAPP', 'EMAIL', 'INSTAGRAM', 'LINKEDIN');

-- CreateEnum
CREATE TYPE "OutreachStatus" AS ENUM ('NEW', 'QUEUED', 'APPROVED', 'SENT', 'REPLIED', 'WON', 'LOST', 'SKIPPED', 'OPTED_OUT');

-- CreateTable
CREATE TABLE "outreach_prospects" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "contactName" TEXT,
    "channel" "OutreachChannel" NOT NULL DEFAULT 'WHATSAPP',
    "phone" TEXT,
    "email" TEXT,
    "handle" TEXT,
    "website" TEXT,
    "niche" TEXT,
    "city" TEXT,
    "observation" TEXT,
    "auditScore" INTEGER,
    "auditFindings" JSONB,
    "auditedAt" TIMESTAMP(3),
    "draft" TEXT,
    "status" "OutreachStatus" NOT NULL DEFAULT 'NEW',
    "followUpStage" INTEGER NOT NULL DEFAULT 0,
    "sentAt" TIMESTAMP(3),
    "lastSentAt" TIMESTAMP(3),
    "nextFollowUpAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outreach_prospects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "outreach_prospects_status_idx" ON "outreach_prospects"("status");

-- CreateIndex
CREATE INDEX "outreach_prospects_nextFollowUpAt_idx" ON "outreach_prospects"("nextFollowUpAt");
