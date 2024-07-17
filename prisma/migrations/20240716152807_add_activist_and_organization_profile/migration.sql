-- CreateTable
CREATE TABLE "Activist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "workingThemes" TEXT NOT NULL,
    "cardPicture" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Activist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "workingThemes" TEXT NOT NULL,
    "cardPicture" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activist_email_key" ON "Activist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");
