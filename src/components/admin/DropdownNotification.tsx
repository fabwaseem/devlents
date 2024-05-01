"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Bell } from "lucide-react";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

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
            <Link
              className="px-4 hover:bg-gray-200   dark:hover:bg-dark-200 flex flex-col gap-2.5 border border-t border-borderColour py-3 dark:border-borderColour-dark"
              href="#"
            >
              <p className="text-sm">
                  Edit your information in a swipe
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
