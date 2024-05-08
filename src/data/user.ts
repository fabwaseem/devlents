import { db } from "@/server/db";
import { User } from "@prisma/client";


/**
 * Retrieves a user from the database based on their email.
 * @param email - The email of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export const getUserByEmail = async (email: string):Promise<User | null> => {
  return await db.user.findUnique({
    where: { email },
  });
};

/**
 * Retrieves a user from the database based on their ID.
 * @param id - The ID of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: { id },
  });
};
