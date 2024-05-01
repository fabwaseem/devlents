import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserButton from "./UserButton";
import DropdownNotification from "./DropdownNotification";




const Header = () => {
  return (
    <header className="z-10 drop-shadow dark:bg-boxdark sticky top-0 flex w-full bg-gray dark:bg-dark dark:drop-shadow-none">
      <div className=" flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Link className="block flex-shrink-0 lg:hidden" href="/admin">
            <Image
              src={"/images/logo.svg"}
              alt={"devlents"}
              width={40}
              height={30}
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form  method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search size={16} />
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="xl:w-96 w-full bg-transparent pl-9 pr-4  focus:outline-none "
              />
            </div>
          </form>
        </div>

        <div className=" flex items-center gap-3">
          <ul className=" flex items-center gap-2">
            <DropdownNotification />
          </ul>

          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
