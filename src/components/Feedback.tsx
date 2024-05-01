"use client";
import React, { useState } from "react";
import { Icons } from "./Icons";

import { Button } from "./ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/Drawer";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/Input";
import { toast } from "react-toastify";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/Textarea";
import { Checkbox } from "./ui/Checkbox";

const items = [
  {
    id: "improvement",
    label: "Improvement 👍",
  },
  {
    id: "integration",
    label: "Integrations 🔗",
  },
  {
    id: "style",
    label: "Styling 🎨",
  },
  {
    id: "misc",
    label: "Misc 🤷",
  },
  {
    id: "bug",
    label: "Bug Report 🐛",
  },
  {
    id: "feature",
    label: "Feature Request 🚀",
  },
] as const;

const Feedback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    title: z.string().min(1, {
      message: "Please write a short title",
    }),
    description: z.string().max(500, {
      message: "Please write a description less than 500 characters",
    }),
    type: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: [],
    },
  });

  interface ResponseData {
    msg: string;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const resData = (await response.json()) as ResponseData;

    if (response.status === 201) {
      toast.success(resData.msg);
      form.reset();
    } else {
      toast.error(resData.msg);
    }
    setIsLoading(false);
  }
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size={"icon"} className="fixed bottom-5 right-5 z-50">
          <Icons.feedback />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:px-5">
        <DrawerHeader>
          <DrawerTitle>Found a bug or need a feature to be added?</DrawerTitle>
          <DrawerDescription>
            Let us know and we will do the same.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col p-4"
          >
            <div className="flex-1 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        id="title"
                        placeholder="One sentence that summarizes your problem or idea"
                        label="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Why your Idea is useful, who would benefit and how it should work?"
                        label="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <p className="font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                        Choose up to 3 Topics for this Idea (optional)
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="type"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0 w-max"
                              >
                                <FormControl>
                                  <div>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      id={item.id}
                                      onCheckedChange={(checked) => {
                                        if (
                                          checked &&
                                          form.getValues("type").length < 3
                                        ) {
                                          field.onChange([
                                            ...field.value,
                                            item.id,
                                          ]);
                                        } else {
                                          field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                        }
                                      }}
                                      className="hidden"
                                    />
                                    <label
                                      htmlFor={item.id}
                                      className={`cursor-pointer rounded-full border px-2 py-1 text-xs ${form.getValues("type").includes(item.id) ? "border-primary text-primary" : "border-borderColour dark:border-borderColour-dark"}`}
                                    >
                                      {item.label}
                                    </label>
                                  </div>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DrawerFooter>
              <div className="flex  gap-3">
                <DrawerClose asChild>
                  <Button type="button" variant="outline" className="flex-1" size={"sm"}>
                    Cancel
                  </Button>
                </DrawerClose>
                <Button type="submit" className="flex-1" size={"sm"}>
                  {isLoading && (
                    <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
                  )}{" "}
                  Submit
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default Feedback;
