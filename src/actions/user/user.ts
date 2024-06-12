"use server";

import cloudinary from "@/lib/cloudinary";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import sharp from "sharp";
import streamifier from "streamifier";

export const getUserLents = async (userId: string) => {
  const lents = await db.lent.findMany({
    where: {
      userId,
    },
  });

  const totalLents = lents.reduce((acc, lent) => {
    return acc + lent.lents;
  }, 0);

  return totalLents;
};

export const geUserUnreadNotifications = async (userId: string) => {
  const notifications = await db.notification.findMany({
    where: {
      userId,
      read: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
};

export const markAllNotificationsAsRead = async (userId: string) => {
  await db.notification.updateMany({
    where: {
      userId,
    },
    data: {
      read: true,
    },
  });

  return { type: "success", message: "" };
};

export const markNotificationAsRead = async (id: string) => {
  await db.notification.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });

  return { type: "success", message: "" };
};

export const updateAvatar = async (data: FormData) => {
  const avatar = data.get("avatar") as File;
  const session = await getServerAuthSession();
  if (!session?.user) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  if (!avatar) {
    return {
      type: "error",
      message: "No image found in the request",
    };
  }

  // check if a valid image file is uploaded
  if (!avatar.type.startsWith("image")) {
    return {
      type: "error",
      message: "Invalid image file type",
    };
  }

  // check if image file size is less than 5MB
  if (avatar.size > 5 * 1024 * 1024) {
    return {
      type: "error",
      message: "Image file size should be less than 5MB",
    };
  }

  const exisingUser = await db.user.findUnique({
    where: { id: session.user.id },
  });

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

    const result = await cloudinary.uploader.upload(dataUri);

    const url = cloudinary.url(result.public_id, {
      gravity: "face",
      width: 200,
      height: 200,
      crop: "fill",
      quality: "auto",
      fetch_format: "auto",
    });

    if (exisingUser?.image) {
      // if url is cloudinary url, delete the existing image
      if (exisingUser.image.includes("res.cloudinary.com")) {
        const publicId = exisingUser.image.split("/").pop()?.split("?")[0];
        console.log("publicId", publicId);
        await cloudinary.uploader.destroy(publicId + "");
      }
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { image: url },
    });

    return { type: "success", message: "Avatar updated successfully", url };
  } catch (error) {
    return {
      type: "error",
      message: "Something went wrong, please try again.",
    };
  }
};
