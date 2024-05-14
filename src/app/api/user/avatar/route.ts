import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import sharp from "sharp";
import streamifier from "streamifier";

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
          msg: `No image found in the request`,
        },
        {
          status: 400,
        },
      );
    }

    // check if a valid image file is uploaded
    if (!avatar.type.startsWith("image")) {
      return NextResponse.json(
        {
          msg: `Invalid image file type`,
        },
        {
          status: 400,
        },
      );
    }

    // check if image file size is less than 5MB
    if (avatar.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          msg: `Image file size should be less than 5MB`,
        },
        {
          status: 400,
        },
      );
    }

    try {
      const buffer = Buffer.from(await avatar.arrayBuffer());
      const image = await sharp(buffer)
        .resize(200)
        .jpeg({ quality: 70 })
        .toBuffer();
      const mime = avatar.type;
      const encoding = "base64";
      const base64 = image.toString("base64");

      const dataUri = `data:${mime};${encoding},${base64}`;

      // const result = await uploadFromBuffer(image);

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "devlents-avatars",
        public_id: session.user.id,
        overwrite: true,
      });

      const url = cloudinary.url(result.public_id, {
        gravity: "face",
        width: 200,
        height: 200,
        crop: "fill",
      });

      // // check if previous image is cloudinary image and delete it
      // if (session.user.image?.includes("res.cloudinary.com")) {
      //   let previousImageId = session.user.image.split("/").pop() ?? "";
      //   previousImageId = previousImageId?.split("?")[0] ?? previousImageId;
      //   console.log("Deleting previous image", previousImageId);
      //   await cloudinary.uploader.destroy(previousImageId);
      // }

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

const uploadFromBuffer = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      {},
      (error: any, result: any) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};
