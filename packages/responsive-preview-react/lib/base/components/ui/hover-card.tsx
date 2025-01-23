import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/base/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "rpr-z-50 rpr-w-64 rpr-rounded-md rpr-border rpr-bg-popover rpr-p-4 rpr-text-popover-foreground rpr-shadow-md rpr-outline-none data-[state=open]:rpr-animate-in data-[state=closed]:rpr-animate-out data-[state=closed]:rpr-fade-out-0 data-[state=open]:rpr-fade-in-0 data-[state=closed]:rpr-zoom-out-95 data-[state=open]:rpr-zoom-in-95 data-[side=bottom]:rpr-slide-in-from-top-2 data-[side=left]:rpr-slide-in-from-right-2 data-[side=right]:rpr-slide-in-from-left-2 data-[side=top]:rpr-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
