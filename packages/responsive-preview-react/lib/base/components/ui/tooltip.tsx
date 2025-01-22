import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/base/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "rpr-z-50 rpr-overflow-hidden rpr-rounded-md rpr-bg-primary rpr-px-3 rpr-py-1.5 rpr-text-xs rpr-text-primary-foreground rpr-animate-in rpr-fade-in-0 rpr-zoom-in-95 data-[state=closed]:rpr-animate-out data-[state=closed]:rpr-fade-out-0 data-[state=closed]:rpr-zoom-out-95 data-[side=bottom]:rpr-slide-in-from-top-2 data-[side=left]:rpr-slide-in-from-right-2 data-[side=right]:rpr-slide-in-from-left-2 data-[side=top]:rpr-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
