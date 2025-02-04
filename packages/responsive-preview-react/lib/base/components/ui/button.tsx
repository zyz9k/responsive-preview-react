import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/base/lib/utils";

const buttonVariants = cva(
  "rpr-inline-flex rpr-items-center rpr-justify-center rpr-gap-2 rpr-whitespace-nowrap rpr-rounded-md rpr-text-sm rpr-font-medium rpr-transition-colors focus-visible:rpr-outline-none focus-visible:rpr-ring-1 focus-visible:rpr-ring-ring disabled:rpr-pointer-events-none disabled:rpr-opacity-50 [&_svg]:rpr-pointer-events-none [&_svg]:rpr-size-4 [&_svg]:rpr-shrink-0",
  {
    variants: {
      variant: {
        default:
          "rpr-bg-primary rpr-text-primary-foreground rpr-shadow hover:rpr-bg-primary/90",
        destructive:
          "rpr-bg-destructive rpr-text-destructive-foreground rpr-shadow-sm hover:rpr-bg-destructive/90",
        outline:
          "rpr-border rpr-border-input rpr-bg-background rpr-shadow-sm hover:rpr-bg-accent hover:rpr-text-accent-foreground",
        secondary:
          "rpr-bg-secondary rpr-text-secondary-foreground rpr-shadow-sm hover:rpr-bg-secondary/80",
        ghost: "hover:rpr-bg-accent hover:rpr-text-accent-foreground",
        link: "rpr-text-primary rpr-underline-offset-4 hover:rpr-underline",
      },
      size: {
        default: "rpr-h-9 rpr-px-4 rpr-py-2",
        sm: "rpr-h-8 rpr-rounded-md rpr-px-3 rpr-text-xs",
        lg: "rpr-h-10 rpr-rounded-md rpr-px-8",
        icon: "rpr-h-9 rpr-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
