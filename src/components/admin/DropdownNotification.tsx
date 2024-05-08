"use client";
import Link from "next/link";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "../ui/Button";
import { Bell } from "lucide-react";
import { getNewActivities, markRead } from "@/actions/admin/activity";
import { Activity } from "@prisma/client";
import { toast } from "react-toastify";

type ActivityData = Activity & {
  user: { username: string | null } | null;
  component: { category: { title: string }; slug: string } | null;
};

const DropdownNotification = () => {
  const [isePending, startTransition] = useTransition();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [activities, setActivities] = useState<ActivityData[]>([]);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    startTransition(async () => {
      await getNewActivities().then((data) => {
        if (data.length > 0) {
          setActivities(data);
          setNotifying(true);
        }
      });
    });
  }, []);

  const handleRead = async (id: string) => {
    startTransition(() => {
      markRead(id)
        .then(() => {
          setActivities((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <li className="relative">
      <Button
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        size={"icon"}
        variant={"icon"}
      >
        <span
          className={`absolute right-2 top-2 z-10 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className=" -z-10  h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
        </span>

        <Bell size={16} />
      </Button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-10 mt-2.5 flex  h-80 w-72 flex-col rounded-xl border border-borderColour bg-gray shadow-default dark:border-borderColour-dark dark:bg-dark sm:right-0 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium">Notifications</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            {activities.map((item, index) => (
              <div
                className="flex flex-col   gap-2.5 border border-t border-borderColour px-4 py-3 hover:bg-gray-200 dark:border-borderColour-dark dark:hover:bg-dark-200"
                key={index}
                onClick={() => handleRead(item.id)}
              >
                <p className="text-sm">
                  {item.user?.username} just{" "}
                  {item.activity === "COMPONENT_CREATED" && "created"}
                  {item.activity === "COMPONENT_UPDATED" && "updated"}
                  {item.activity === "COMPONENT_DELETED" && "deleted"}{" "}
                  {item.component?.category.title} component
                </p>

                <p className="text-xs">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
