import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import slugify from "slugify";
import { getServerAuthSession } from "@/server/auth";
import { generateSlug } from "random-word-slugs";
import type { Category } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const category = data.get("category") as string;
    const html = data.get("html") as string;
    const css = data.get("css") as string;

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

    const slug = generateSlug(3);

    const categorySlug = slugify(category, { lower: true, strict: true });
    let existingCategory: Category | null = null;

    try {
      existingCategory = await db.category.findUnique({
        where: { slug: categorySlug },
      });
    } catch (error) {
      console.error("Error finding category:", error);
      return NextResponse.json(
        { msg: "An error occurred while creating the component." },
        { status: 500 },
      );
    }

    if (!existingCategory) {
      const newCategory = await db.category.create({
        data: { title: category, slug: categorySlug },
      });
      existingCategory = newCategory;
    }

    try {
     const component = await db.component.create({
       data: {
         slug,
         categoryId: existingCategory.id,
         html,
         css,
         userId: session?.user.id + "",
         status: "DRAFT",
       },
     });
      return NextResponse.json(
        { msg: "Component saved in drafts!", component },
        { status: 201 },
      );
    } catch (error) {
      console.error("Error creating component:", error);
      return NextResponse.json(
        { msg: "An error occurred while creating the component." },
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
