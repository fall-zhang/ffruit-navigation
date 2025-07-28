-- CreateTable
CREATE TABLE "NavLink" (
    "id" SERIAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorUrl" TEXT NOT NULL,
    "auditTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "view" INTEGER NOT NULL DEFAULT 0,
    "star" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL,
    "accessState" INTEGER NOT NULL,

    CONSTRAINT "NavLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subGroup" TEXT NOT NULL,

    CONSTRAINT "NavCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFeedback" (
    "id" SERIAL NOT NULL,
    "programName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "images" TEXT[],
    "isHandled" BOOLEAN NOT NULL DEFAULT false,
    "reportUser" TEXT NOT NULL,
    "deviceName" TEXT NOT NULL,

    CONSTRAINT "UserFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTrack" (
    "_id" INTEGER NOT NULL,
    "programName" TEXT NOT NULL,
    "errorContent" TEXT NOT NULL,

    CONSTRAINT "UserTrack_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NavLinkToNavTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NavLinkToNavTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NavLinkToNavTag_B_index" ON "_NavLinkToNavTag"("B");

-- AddForeignKey
ALTER TABLE "_NavLinkToNavTag" ADD CONSTRAINT "_NavLinkToNavTag_A_fkey" FOREIGN KEY ("A") REFERENCES "NavLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NavLinkToNavTag" ADD CONSTRAINT "_NavLinkToNavTag_B_fkey" FOREIGN KEY ("B") REFERENCES "NavTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
