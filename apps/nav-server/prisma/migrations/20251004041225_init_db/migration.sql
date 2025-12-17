-- CreateTable
CREATE TABLE "UserInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastLoginTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);
