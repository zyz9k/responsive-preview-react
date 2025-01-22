"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/base/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "rpr-inline-flex rpr-h-9 rpr-items-center rpr-justify-center rpr-rounded-lg rpr-bg-muted rpr-p-1 rpr-text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "rpr-inline-flex rpr-items-center rpr-justify-center rpr-whitespace-nowrap rpr-rounded-md rpr-px-3 rpr-py-1 rpr-text-sm rpr-font-medium rpr-ring-offset-background rpr-transition-all focus-visible:rpr-outline-none focus-visible:rpr-ring-2 focus-visible:rpr-ring-ring focus-visible:rpr-ring-offset-2 disabled:rpr-pointer-events-none disabled:rpr-opacity-50 data-[state=active]:rpr-bg-background data-[state=active]:rpr-text-foreground data-[state=active]:rpr-shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "rpr-mt-2 rpr-ring-offset-background focus-visible:rpr-outline-none focus-visible:rpr-ring-2 focus-visible:rpr-ring-ring focus-visible:rpr-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
