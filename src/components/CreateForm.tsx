"use client";

import CodeEditor from "@/components/CodeEditor";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { TagsInput } from "@/components/ui/TagsInput";
import { Select } from "@/components/ui/Select";
import { componentCategories } from "@/lib/config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import type { Component, User } from "@prisma/client";
import useDebounce from "@/app/hook/useDebounce";
import { type Session } from "next-auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ReactShadowRoot from "react-shadow-root";
import parse from "html-react-parser";
import { Allotment } from "allotment";
type Props = Component & {
  user: User;
};

const CreateForm = ({
  component,
}: {
  component?: Props;
}) => {
  const [debouncedCode, code, setCode] = useDebounce(
    {
      html: component?.html ?? "",
      css: component?.css ?? "",
    },
    1000,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = z
    .object({
      category: z.string(),
      tags: z.array(z.string()),
    })
    .refine(
      (data) => {
        if (data.tags.length < 1) {
          return false;
        }
        return true;
      },
      { message: "At least 1 tag is required", path: ["tags"] },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: componentCategories[0]?.value,
      tags: [],
    },
  });

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleTagsChange = (tags: string[]) => {
    form.setValue("tags", tags);
  };

  type createComponentProps = {
    msg: string;
    component: Component;
  };

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("html", code.html);
      formData.append("css", code.css);
      // formData.append("javascript", codeState.javascript);

      const response = await axios.post("/api/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const resData = (await response.data) as createComponentProps;
      if (response.status === 201) {
        form.reset();
        toast.success(resData.msg);
        router.push(`/component/${resData.component.slug}`);
      } else {
        toast.error(resData.msg);
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      }
    }
    setIsLoading(false);
    setOpen(false);
  };
  const saveDraft = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("html", code.html);
      formData.append("css", code.css);

      const response = await axios.post("/api/draft", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const resData = (await response.data) as createComponentProps;
      console.log(resData.msg);
      if (response.status === 201) {
        form.reset();
        toast.success(resData.msg);
        router.push(`/component/${resData.component.slug}`);
      } else {
        toast.error(resData.msg);
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      }
    }
    setIsLoading(false);
    setOpen(false);
  };

  const onChange = ({
    language,
    value,
  }: {
    language: string;
    value: string;
  }) => {
    setCode({
      ...code,
      [language]: value,
    });
  };

  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (code.html !== component?.html || code.css !== component?.css) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [code, component]);

  return (
    <>
      <div className="container flex h-full flex-col pb-4">
        <div className="min-h-[500px] flex-1 overflow-hidden rounded-xl border dark:border-gray">
          <Allotment>
            <Allotment.Pane minSize={300}>
              <CodeEditor code={debouncedCode} onChange={onChange} />
            </Allotment.Pane>
            <Allotment.Pane minSize={300}>
              <div className="relative z-[1] flex h-full w-full  items-center  justify-center bg-gray dark:bg-dark-200">
                <ReactShadowRoot>
                  <style>{debouncedCode.css}</style>
                  {parse(debouncedCode.html + "")}
                </ReactShadowRoot>
              </div>
            </Allotment.Pane>
          </Allotment>
        </div>

        <div className="mt-4 rounded-xl bg-gray p-2  dark:bg-dark">
          <div className="flex h-full min-h-[40px]  items-stretch justify-between gap-2">
            <div className="left flex items-center gap-2">
              <div className="h-full w-[2px] bg-dark" />
              <Button variant={"icon"} size={"icon"}>
                <Icons.eye size={16} />
              </Button>
            </div>
            <div className="flex items-stretch gap-2">
              <Button
                variant={"outline"}
                className="hidden md:flex"
                size={"sm"}
                onClick={saveDraft}
                disabled={
                  isLoading ||
                  code.html.length + code.css.length < 10 ||
                  !isChanged
                }
              >
                <Icons.folderOpen size={16} /> Save as a draft
              </Button>
              <Button
                onClick={onOpenModal}
                className="hidden md:flex"
                size={"sm"}
                disabled={
                  isLoading ||
                  code.html.length + code.css.length < 10 ||
                  !isChanged
                }
              >
                <Icons.rocket size={16} />
                Submit for review
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className=" md:hidden"
                onClick={saveDraft}
              >
                <Icons.folderOpen size={16} />
              </Button>
              <Button
                onClick={onOpenModal}
                size={"icon"}
                className=" md:hidden"
              >
                <Icons.rocket size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          root: "!z-[9999999999999]",
          modal:
            "max-w-[1200px] !m-0 w-full dark:!bg-dark-300 dark:!text-white !rounded-xl",
          closeIcon: "dark:!fill-white",
        }}
      >
        <div className="pt-10">
          <h3>Component details</h3>
          <div className="mt-5 flex flex-col gap-5 md:flex-row">
            {/* <div className="aspect-video flex-1">
              <FileUpload
                onchange={(file) => handleChangeThumbnail(file)}
                error={form.formState.errors.thumbnail?.message}
              />
            </div> */}
            <form
              className="flex-1 space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div>
                <Select
                  label="Category"
                  required
                  {...form.register("category")}
                >
                  {componentCategories.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>
                {form.formState.errors.category && (
                  <p className="mt-1 text-xs text-red-500">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <TagsInput
                  label="Tags"
                  minTags={1}
                  tags={form.watch("tags")}
                  onChange={handleTagsChange}
                />
                {form.formState.errors.tags && (
                  <p className="mt-1 text-xs text-red-500">
                    {form.formState.errors.tags.message}
                  </p>
                )}
              </div>
              <Button
                onClick={onOpenModal}
                className="ml-auto"
                type="submit"
                disabled={isLoading}
              >
                <Icons.rocket />
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateForm;
