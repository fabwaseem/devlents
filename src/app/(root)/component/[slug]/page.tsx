import Preview from "@/components/Preview";
import { adminRoles } from "@/lib/admin-config";
import { includeComponent } from "@/lib/prisma/includeComponent";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerAuthSession();

  const component = await db.component.findUnique({
    where: {
      slug: params.slug,
    },
    include: includeComponent(session?.user.id),
  });

  if (!component) {
    return notFound();
  }

  if (
    component.status !== "PUBLISHED" &&
    component.userId !== session?.user.id

  ) {
    if (!session?.user || !adminRoles.includes(session?.user.role)) {
      return notFound();
    }
  }

  if (
    session?.user.id !== component.userId &&
    component.status === "PUBLISHED"
  ) {
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
    <section className="relative mb-[150px] flex h-screen min-h-[800px] items-center justify-center pt-[120px] max-md:mb-[100px]">
      <Preview session={session} component={component} />
    </section>
  );
};

export default page;
