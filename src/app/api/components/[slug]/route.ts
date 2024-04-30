import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const session = await getServerAuthSession();
  const component = await db.component.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      id: true,
      views: true,
      html: true,
      css: true,
      category: true,
      tags: true,
      user: {
        select: {
          id: true,
          username: true,
        },

      },
      slug: true,
      upvotes: {
        where: {
          id: session?.user.id ?? "",
        },
        select: {
          id: true,
        },
      },
      favourites: {
        where: {
          id: session?.user.id ?? "",
        },
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          upvotes: true,
          favourites: true,
        },
      },
    },
  });
  if (component === null) return NextResponse.json(null);
  return NextResponse.json(component);
}
