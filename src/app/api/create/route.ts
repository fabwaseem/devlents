import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import slugify from "slugify";
import { getServerAuthSession } from "@/server/auth";
import { generateSlug } from "random-word-slugs";
import type { Category } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    // const thumbnail = data.get("thumbnail") as File;
    const category = data.get("category") as string;
    const tagsString = data.get("tags") as string;
    const html = data.get("html") as string;
    const css = data.get("css") as string;
    const javascript = data.get("javascript") as string;

    if (!category || !tagsString) {
      return NextResponse.json(
        {
          msg: `Please fill all required fields.`,
        },
        {
          status: 400,
        },
      );
    }

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

    // const uploadDir = path.join("public", "tmp");
    // console.log(uploadDir);
    // const thumbnailPath = path.join(uploadDir, path.basename(thumbnail.name));
    // const buffer = Buffer.from(await thumbnail.arrayBuffer());
    // const image = await sharp(buffer).jpeg({ quality: 70 }).toBuffer();
    // await fs.mkdir(uploadDir, { recursive: true });
    // await fs.writeFile(thumbnailPath, image);

    // const uploadedImageResponse = await cloudinary.uploader.upload(
    //   thumbnailPath,
    //   { resource_type: "image" },
    // );

    // await fs.unlink(thumbnailPath);

    const tags = JSON.parse(tagsString) as string[];
    try {
      const component = await db.component.create({
        data: {
          slug,
          categoryId: existingCategory.id,
          tags: {
            connectOrCreate: tags.map((tag) => {
              return {
                where: { slug: slugify(tag) },
                create: { title: tag, slug: slugify(tag) },
              };
            }),
          },
          // thumbnail: uploadedImageResponse.public_id,
          html,
          css,
          javascript,
          userId: session?.user.id + "",
        },
      });

      await db.activity.create({
        data: {
          activity: "COMPONENT_CREATED",
          userId: session?.user.id + "",
          componentId: component.id,
        },
      });

      // await db.notification.create({
      //   data: {
      //     userId: session?.user.id + "",
      //     message: `Component submitted for approval`,
      //     type: "COMPONENT_SUBMITTED",
      //   },
      // });

      return NextResponse.json(
        { msg: "Component created successfully!", component },
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
