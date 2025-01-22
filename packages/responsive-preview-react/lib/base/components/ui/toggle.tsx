"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/base/lib/utils"

const toggleVariants = cva(
  "rpr-inline-flex rpr-items-center rpr-justify-center rpr-gap-2 rpr-rounded-md rpr-text-sm rpr-font-medium rpr-transition-colors hover:rpr-bg-muted hover:rpr-text-muted-foreground focus-visible:rpr-outline-none focus-visible:rpr-ring-1 focus-visible:rpr-ring-ring disabled:rpr-pointer-events-none disabled:rpr-opacity-50 data-[state=on]:rpr-bg-accent data-[state=on]:rpr-text-accent-foreground [&_svg]:rpr-pointer-events-none [&_svg]:rpr-size-4 [&_svg]:rpr-shrink-0",
  {
    variants: {
      variant: {
        default: "rpr-bg-transparent",
        outline:
          "rpr-border rpr-border-input rpr-bg-transparent rpr-shadow-sm hover:rpr-bg-accent hover:rpr-text-accent-foreground",
      },
      size: {
        default: "rpr-h-9 rpr-px-2 rpr-min-w-9",
        sm: "rpr-h-8 rpr-px-1.5 rpr-min-w-8",
        lg: "rpr-h-10 rpr-px-2.5 rpr-min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
