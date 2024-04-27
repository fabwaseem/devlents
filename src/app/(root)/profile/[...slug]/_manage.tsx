"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Session } from "next-auth";

const ManageProfile = ({session}:{session: Session}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters long",
    }),
    website: z.union([z.literal(""), z.string().trim().url()]),
    location: z.string(),
    company: z.string(),
    bio: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      website: session?.user?.website ?? "",
      location: session?.user?.location ?? "",
      company: session?.user?.company ?? "",
      bio: session?.user?.bio ?? "",
    },
  });

  interface ResponseData {
    msg: string;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const resData = (await response.json()) as ResponseData;

    if (response.status === 201) {
      toast.success(resData.msg);
      setOpen(false);
    } else {
      toast.error(resData.msg);
    }
    setIsLoading(false);
  }
  const [open, setOpen] = useState(true);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className=" flex flex-wrap gap-1 text-sm">
      <Button variant={"ghost"} size={"sm"} onClick={onOpenModal}>
        <Icons.settings size={16} />
        Edit profile
      </Button>
      <Button variant={"ghost"} size={"sm"} onClick={() => signOut()}>
        <Icons.logOut size={16} />
        Logout
      </Button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal:
            "max-w-[1200px] !m-0 w-full dark:!bg-dark-300 dark:!text-white !rounded-xl",
          closeIcon: "dark:!fill-white",
        }}
      >
        <span className="flex items-center gap-2 text-2xl font-bold">
          <Icons.settings /> Edit profile
        </span>
        <p className="my-2 text-sm text-dark/50 dark:text-gray/50">
          Fields marked with * are required.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 ">
              <div className="flex flex-col gap-6 md:flex-row md:gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          id="name"
                          required
                          placeholder="Enter your name"
                          label="Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          id="company"
                          placeholder="Enter your company name"
                          label="Company"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-6 md:flex-row md:gap-2">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          id="website"
                          placeholder="Enter your website address"
                          label="Website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          id="location"
                          placeholder="Enter your location"
                          label="Location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        id="bio"
                        placeholder="Write a short bio about yourself"
                        label="Bio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-5">
                <Button type="button" variant="outline" onClick={onCloseModal}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isLoading && (
                    <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
                  )}
                  Update
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageProfile;
