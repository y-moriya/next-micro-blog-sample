-- CreateTable
CREATE TABLE "Post" (
"id" SERIAL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY("userId")REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
