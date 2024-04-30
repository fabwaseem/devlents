import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

interface Body {
  title: string;
  description?: string;
  type: string[];
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as Body;
    console.log(data);
    const { title, description, type } = data;
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

    try {
       await db.feedback.create({
        data: {
          title,
          description,
          type: type.join(","),
          userId: session.user.id,
        },
      });

      return NextResponse.json(
        { msg: "Thank you for your feedback!" },
        { status: 201 },
      );
    } catch (error) {
      console.error("Error creating adding feedback:", error);
      return NextResponse.json(
        { msg: "An error occurred while adding feedback." },
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
