import { cn } from "@/lib/utils";
import React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, label, ...props }, ref) => {
    return (
      <label htmlFor={id} className="flex items-center gap-x-3">
        <input
          ref={ref}
          {...props}
          id={id}
          type="checkbox"
          className="peer sr-only"
        />
        <div className="flex-shrink-0 relative h-5 w-5 cursor-pointer rounded-full border border-borderColour after:absolute after:left-1/2 after:top-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-primary after:opacity-0 peer-checked:border-primary peer-checked:after:opacity-100 dark:border-borderColour-dark dark:peer-checked:border-primary" />
        <span className="block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
          {label}
        </span>
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
