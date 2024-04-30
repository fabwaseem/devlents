"use client";

import CodeEditor from "@/components/CodeEditor";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { formatNumber, handleDownload } from "@/lib/utils";
import Link from "next/link";
import { type Session } from "next-auth";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import ReactShadowRoot from "react-shadow-root";
import parse from "html-react-parser";
import {
  ArrowLeft,
  Code,
  Download,
  EllipsisVertical,
  ExternalLink,
  Eye,
  GitFork,
  Heart,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Modal from "react-responsive-modal";
import { ComponentData } from "@/types";

const Preview = ({
  session,
  component,
}: {
  session?: Session | null;
  component: ComponentData;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [state, setState] = useState({
    upvoted: component.upvotes.length > 0,
    favorited: component.favourites.length > 0,
    totalUpvotes: component._count.upvotes,
    totalFavourites: component._count.favourites,
  });
  const router = useRouter();
  const params = useParams();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/components`, {
        data: {
          id: component?.id,
        },
      });
      if (response.status === 200) {
        toast.success("Deleted successfully");
        router.push(`/profile/${session?.user.username}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      }
    }
    setIsLoading(false);
  };

  const handleUpvote = async () => {
    try {
      const response = await axios.post(`/api/components/upvote`, {
        id: component?.id,
        upvoted: state.upvoted,
      });
      if (response.status === 200) {
        let totalUpvotes = state.totalUpvotes;
        if (state.upvoted) {
          totalUpvotes -= 1;
        } else {
          totalUpvotes += 1;
        }
        setState({
          ...state,
          upvoted: !state.upvoted,
          totalUpvotes,
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      }
    }
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.post(`/api/components/favourite`, {
        id: component?.id,
        favorited: state.favorited,
      });
      if (response.status === 200) {
        setState({ ...state, favorited: !state.favorited });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      }
    }
  };

  const isOwner = session?.user.id === component?.user.id;

  return (
    <>
      <div className="container flex h-full flex-col pb-4">
        <div className="flex items-center  justify-between  p-2">
          <Button variant={"outline"} size={"sm"} onClick={() => router.back()}>
            <ArrowLeft size={16} />
            Go back
          </Button>

          <div className="hidden items-center space-x-2 sm:space-x-3 lg:flex">
            {/* <Button variant={"outline"} size={"sm"}>
                  <ExternalLink size={16} />
                  Full screen Preview
                </Button> */}
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() =>
                handleDownload({
                  html: component?.html,
                  css: component?.css,
                  filename: `${component.category.title} by ${component.user.username}`,
                })
              }
            >
              <Download size={16} />
              Download
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setShowCode(!showCode)}
            >
              <Code size={16} />
              {showCode ? "Show Preview" : "Show Code"}
            </Button>
          </div>
          <div className="lg:hidden">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="data-[state=open]:text-white data-[state=open]:before:scale-x-100"
                >
                  <EllipsisVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <button className="flex items-center gap-3 whitespace-nowrap">
                    <ExternalLink size={16} />
                    Full screen Preview
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button className="flex items-center gap-3 whitespace-nowrap">
                    <Download size={16} />
                    Download
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <Code size={16} />
                    {showCode ? "Hide Code" : "Show Code"}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="h-full w-full overflow-hidden">
          {showCode ? (
            <CodeEditor code={{ html: component?.html, css: component?.css }} />
          ) : (
            <div className="relative z-[1] flex h-full w-full  items-center  justify-center overflow-hidden rounded-xl bg-gray dark:bg-dark-200">
              <ReactShadowRoot>
                <style>{component?.css}</style>
                {parse(component?.html + "")}
              </ReactShadowRoot>
            </div>
          )}
        </div>
        <div className="mt-4 rounded-xl bg-gray p-2  dark:bg-dark">
          <div className="flex h-full min-h-[40px] flex-wrap items-stretch justify-between gap-2 ">
            <div className=" flex items-center gap-2">
              <div className="ml-1 mr-5 h-full w-0.5 bg-gray-500/70" />
              <div className="mr-5 flex items-center gap-3 ">
                <Eye size={16} />
                {formatNumber(component?.views ?? 0)}
              </div>
              <div className="flex items-center gap-3">
                <Icons.upvote />
                {formatNumber(state.totalUpvotes ?? 0)}
              </div>

              {isOwner && (
                <>
                  <div className="mx-5 h-full w-0.5 bg-gray-500/70" />
                  <Button
                    variant={"icon"}
                    size={"icon"}
                    onClick={() => setOpen(true)}
                  >
                    <Icons.delete size={16} />
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className={`hidden lg:flex
                    ${state.upvoted ? "text-white before:scale-x-100" : ""}
                  `}
                  onClick={handleUpvote}
                >
                  <Icons.upvote size={16} />{" "}
                  {state.upvoted ? "Upvoted" : "Upvote"}
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className={` lg:hidden
                    ${state.upvoted ? "text-white before:scale-x-100" : ""}
                  `}
                  onClick={handleUpvote}
                >
                  <Icons.upvote size={16} />
                </Button>
              </div>
              <div>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className={`hidden lg:flex
                        ${state.favorited ? "text-white before:scale-x-100" : ""}
                      `}
                  onClick={handleFavourite}
                >
                  <Heart size={16} />{" "}
                  {state.favorited ? "Added to Favorited" : "Save to Favorites"}
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className={` lg:hidden
                    ${state.favorited ? "text-white before:scale-x-100" : ""}
                  `}
                  onClick={handleFavourite}
                >
                  <Heart size={16} />
                </Button>
              </div>
              <Link href={`/create?fork=${component?.slug}`}>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="hidden lg:flex"
                >
                  <GitFork size={16} /> Fork
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className=" lg:hidden"
                >
                  <GitFork size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          modal:
            "max-w-[1200px] !m-0 w-full dark:!bg-dark-300 dark:!text-white !rounded-xl",
          closeIcon: "dark:!fill-white",
        }}
      >
        <div className="">
          <div className="pb-4 text-center text-2xl font-bold">
            Delete component?
          </div>
          <p className="pb-3 text-center">
            <span className="font-semibold text-red-500">Careful! </span> This
            action cannot be undone.
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              size={"sm"}
              onClick={handleDelete}
              className="after:bg-red-500 dark:after:bg-red-500"
              disabled={isLoading}
            >
              <Trash size={16} /> Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Preview;
