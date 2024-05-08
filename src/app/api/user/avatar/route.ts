import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import console from "console";
import {type NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log(data);
    const avatar = data.get("avatar") as File;
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

    if (!avatar) {
      return NextResponse.json(
        {
          msg: `No avatar found in the request`,
        },
        {
          status: 400,
        },
      );
    }

    try {
      const uploadDir = path.join("public", "tmp");
      const thumbnailPath = path.join(uploadDir, path.basename(avatar.name));
      const buffer = Buffer.from(await avatar.arrayBuffer());
      const image = await sharp(buffer)
        .resize(200)
        .jpeg({ quality: 70 })
        .toBuffer();
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(thumbnailPath, image);

      const uploadedImageResponse = await cloudinary.uploader.upload(
        thumbnailPath,
        { resource_type: "image" },
      );

      await fs.unlink(thumbnailPath);

      const id = uploadedImageResponse.public_id;

      const url = cloudinary.url(id, {
        gravity: "face",
        width: 200,
        height: 200,
        crop: "fill",
      });

      // check if previous image is cloudinary image and delete it
      if (session.user.image?.includes("res.cloudinary.com")) {
        let previousImageId = session.user.image.split("/").pop() ?? "";
        previousImageId = previousImageId?.split("?")[0] ?? previousImageId;
        console.log("Deleting previous image", previousImageId);
        await cloudinary.uploader.destroy(previousImageId);
      }

      await db.user.update({
        where: { id: session.user.id },
        data: { image: url },
      });
      return NextResponse.json(
        { msg: "Profile image updated successfully.", url },
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
