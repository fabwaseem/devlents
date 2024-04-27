import CreateForm from "@/components/CreateForm";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const component = await db.component.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      user: true,
    },
  });

  if (!component) {
    return notFound();
  }

  const session = await getServerAuthSession();

  if (
    component.status !== "published" &&
    component.userId !== session?.user.id
  ) {
    return notFound();
  }

  if (session?.user.id !== component.userId) {
    await db.component.update({
      where: {
        id: component.id,
      },
      data: {
        views: component.views + 1,
      },
    });
  }

  return (
    <section className="relative mb-[150px] flex  h-screen items-center justify-center pt-[150px] max-md:mb-[100px]">
      <CreateForm
        component={component || undefined}
        viewMode={true}
        session={session}
      />
    </section>
  );
};

export default page;
