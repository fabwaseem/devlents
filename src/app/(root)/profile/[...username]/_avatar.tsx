"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import UserImage from "public/images/user.jpg";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { data } from "tailwindcss/defaultTheme";
const AvatarUpload = () => {
  const { data: session, update } = useSession();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post("/api/user/avatar", formData);
      const data = await res.data;
      if (res.status === 201) {
        toast.success(data.msg);
        update({
          user: {
            image: data.url,
          },
        });
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("An error occurred while uploading the avatar");
    }
  };

  return (
    <label htmlFor="avatar" className=" relative block ">
      <Image
        className="rounded-lg object-cover"
        src={session?.user.image ?? UserImage}
        alt={session?.user.name + ""}
        width={200}
        height={200}
      />
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="text-md flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
          Change Avatar
        </div>
      </div>
      <input
        type="file"
        id="avatar"
        onChange={handleUpload}
        hidden
        className="hidden"
      />
    </label>
  );
};

export default AvatarUpload;
