import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

interface Body {
  id: string;
  favorited: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { id, favorited } = (await request.json()) as Body;

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



    if (favorited) {
      await db.component.update({
        where: { id },
        data: {
          favourites: {
            disconnect: {
              id: session.user.id,
            },
          },
        },
      });
    } else {
      await db.component.update({
        where: { id },
        data: {
          favourites: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }

    return NextResponse.json({ msg: "Addedd" }, { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { msg: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
