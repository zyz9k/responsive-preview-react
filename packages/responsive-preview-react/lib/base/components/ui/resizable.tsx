import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/base/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "rpr-flex rpr-h-full rpr-w-full data-[panel-group-direction=vertical]:rpr-flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "rpr-relative rpr-flex rpr-w-px rpr-items-center rpr-justify-center rpr-bg-border after:rpr-absolute after:rpr-inset-y-0 after:rpr-left-1/2 after:rpr-w-1 after:rpr--translate-x-1/2 focus-visible:rpr-outline-none focus-visible:rpr-ring-1 focus-visible:rpr-ring-ring focus-visible:rpr-ring-offset-1 data-[panel-group-direction=vertical]:rpr-h-px data-[panel-group-direction=vertical]:rpr-w-full data-[panel-group-direction=vertical]:after:rpr-left-0 data-[panel-group-direction=vertical]:after:rpr-h-1 data-[panel-group-direction=vertical]:after:rpr-w-full data-[panel-group-direction=vertical]:after:rpr--translate-y-1/2 data-[panel-group-direction=vertical]:after:rpr-translate-x-0 [&[data-panel-group-direction=vertical]>div]:rpr-rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="rpr-z-10 rpr-flex rpr-h-4 rpr-w-3 rpr-items-center rpr-justify-center rpr-rounded-sm rpr-border rpr-bg-border">
        <GripVertical className="rpr-h-2.5 rpr-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
