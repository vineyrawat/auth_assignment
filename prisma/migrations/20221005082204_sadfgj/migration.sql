/*
  Warnings:

  - Added the required column `lastModifiedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subject" TEXT NOT NULL,
    "actionType" TEXT NOT NULL DEFAULT 'LOG',
    "description" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserLog_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserLog" ("description", "id", "ip", "subject") SELECT "description", "id", "ip", "subject" FROM "UserLog";
DROP TABLE "UserLog";
ALTER TABLE "new_UserLog" RENAME TO "UserLog";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedAt" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "passwordResetToken" TEXT,
    "passwordResetTokenExpiry" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "passwordResetToken", "passwordResetTokenExpiry") SELECT "createdAt", "email", "id", "name", "password", "passwordResetToken", "passwordResetTokenExpiry" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
