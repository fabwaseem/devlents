import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,label, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white"
          >
            {label}
            {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "block  w-full rounded-[48px] border border-borderColour bg-transparent bg-white  px-5 py-3.5 text-sm text-paragraph-light shadow-sm outline-none  transition-colors duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-paragraph-light focus:border-primary focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-borderColour-dark dark:bg-dark-200",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
