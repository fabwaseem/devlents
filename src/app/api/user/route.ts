import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

interface UserData {
  name?: string;
  username?: string;
  website?: string;
  location?: string;
  company?: string;
  bio?: string;
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await request.json()) as UserData;

    const session = await getServerAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        {
          msg: `Unauthorized`,
        },
        {
          status: 401,
        },
      );
    }

    const existingUser = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          msg: `User not found`,
        },
        {
          status: 404,
        },
      );
    }

    if (data.username && data.username !== existingUser.username) {
      const existingUsername = await db.user.findUnique({
        where: { username: data.username },
      });

      if (existingUsername) {
        return NextResponse.json(
          {
            msg: `Username already taken`,
          },
          {
            status: 400,
          },
        );
      }
    }

    try {
      await db.user.update({
        where: { id: session.user.id },
        data,
      });
      return NextResponse.json(
        { msg: "Profile updated successfully." },
        { status: 201 },
      );
    } catch (error) {
      console.error("Error updating user profile:", error);
      return NextResponse.json(
        { msg: "An error occurred while updating the profile." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { msg: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
