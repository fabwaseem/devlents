import CreateForm from "@/components/CreateForm";
import { db } from "@/server/db";

interface Props {
  searchParams: {
    fork?: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const componentSlug = searchParams.fork;
  let component = undefined;
  if (componentSlug) {
    component = await db.component.findUnique({
      where: {
        slug: componentSlug,
      },
      include: {
        user: true,
      },
    });
  }

  return (
    <section className="relative mb-[150px] flex  h-screen items-center justify-center pt-[150px] max-md:mb-[100px]">
      <CreateForm component={component ?? undefined} />
    </section>
  );
};

export default Page;
