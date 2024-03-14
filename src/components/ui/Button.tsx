import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "text-base font-Inter font-medium leading-6 -tracking-[0.3px] text-white hover:text-white dark:text-paragraph dark:hover:text-paragraph rounded-[30px] relative z-0 before:-z-10 before:rounded-[30px] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-right before:scale-x-0 before:bg-borderColour-dark dark:before:bg-primary-200 before:transition-transform before:duration-500 before:hover:origin-left before:hover:scale-x-100 overflow-hidden ",
  {
    variants: {
      variant: {
        default:
          "after:absolute after:w-full after:h-full after:rounded-[30px] after:bg-paragraph after:dark:bg-primary after:left-0 after:top-0 after:-z-20",
        outline:
          "duration-500 transition-all hover:duration-500 hover:transition-all  bg-white text-paragraph border-borderColour dark:bg-transparent border dark:border-[#313330] dark:text-white hover:text-white relative z-10 before:-z-10 before:rounded-[30px] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-right before:scale-x-0 before:bg-paragraph dark:before:bg-primary before:transition-transform before:duration-500 before:hover:origin-left before:hover:scale-x-100",
        navbar:
          "after:absolute after:w-full after:h-full after:rounded-[30px] after:bg-paragraph  after:left-0 after:top-0 after:-z-20 after:dark:bg-dark-200 dark:text-white",
        icon: "dark:bg-dark-200 flex items-center justify-center rounded-full bg-white outline-none before:bg-gray-100",
      },
      size: {
        default: "py-[13px] px-[30px]",
        sm: "px-6 py-2",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
