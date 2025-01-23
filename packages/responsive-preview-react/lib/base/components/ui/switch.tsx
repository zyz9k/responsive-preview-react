"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/base/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "rpr-peer rpr-inline-flex rpr-h-5 rpr-w-9 rpr-shrink-0 rpr-cursor-pointer rpr-items-center rpr-rounded-full rpr-border-2 rpr-border-transparent rpr-shadow-sm rpr-transition-colors focus-visible:rpr-outline-none focus-visible:rpr-ring-2 focus-visible:rpr-ring-ring focus-visible:rpr-ring-offset-2 focus-visible:rpr-ring-offset-background disabled:rpr-cursor-not-allowed disabled:rpr-opacity-50 data-[state=checked]:rpr-bg-primary data-[state=unchecked]:rpr-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "rpr-pointer-events-none rpr-block rpr-h-4 rpr-w-4 rpr-rounded-full rpr-bg-background rpr-shadow-lg rpr-ring-0 rpr-transition-transform data-[state=checked]:rpr-translate-x-4 data-[state=unchecked]:rpr-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
