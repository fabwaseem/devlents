import CreateForm from "@/components/CreateForm";
import { db } from "@/server/db";

interface Props {
  searchParams: {
    componentId?: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const variationId = searchParams.componentId;
  let component = undefined;
  if (variationId) {
    component = await db.component.findUnique({
      where: {
        id: variationId,
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
