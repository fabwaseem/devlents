import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";

interface DeleteBody {
  id: string;
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json() as DeleteBody;

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

    const component = await db.component.findUnique({
      where: {
        id,
        userId: session?.user.id + "",
      },
    });

    if (!component) {
      return NextResponse.json(
        {
          msg: `Component not found`,
        },
        {
          status: 404,
        },
      );
    }

    await db.component.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ msg: "Component deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { msg: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
