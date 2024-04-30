import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "text-base font-sans font-medium leading-6 -tracking-[0.3px] text-white  dark:text-white  relative z-0 before:-z-10  before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-right before:scale-x-0 before:bg-borderColour-dark dark:before:bg-primary-200 before:transition-transform before:duration-500 before:hover:origin-left before:hover:scale-x-100 disabled:before:hover:scale-x-0 overflow-hidden flex items-center  justify-center disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden overflow-ellipsis whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "after:absolute after:w-full after:h-full  after:bg-paragraph after:dark:bg-primary after:left-0 after:top-0 after:-z-20 ",
        outline:
          "duration-500 transition-all hover:transition-all  bg-white text-paragraph border-borderColour dark:bg-transparent border dark:border-[#313330]  z-10 before:bg-paragraph dark:before:bg-primary hover:text-white disabled:hover:text-paragraph",
        icon: "dark:bg-dark-200 text-paragraph hover:text-paragraph  bg-white outline-none before:bg-gray-100",
        ghost:
          "text-paragraph hover:text-paragraph  outline-none before:bg-gray dark:before:bg-dark",
      },
      size: {
        default:
          "py-[13px] px-[30px] rounded-xl before:rounded-xl after:rounded-xl gap-2",
        sm: "px-6 py-2 rounded-lg before:rounded-lg after:rounded-lg gap-2",
        icon: "h-10 w-10 rounded-lg before:rounded-lg after:rounded-lg",
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
