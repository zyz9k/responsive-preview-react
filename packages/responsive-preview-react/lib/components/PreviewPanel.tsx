import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/base/components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";
import { cn } from "@/base/lib/utils";

interface PreviewPanelProps {
  children: React.ReactNode;
  className?: string;
  panelRef: React.RefObject<ImperativePanelHandle>;
  contentRef: React.RefObject<HTMLDivElement>;
}

export function PreviewPanel({
  children,
  className,
  panelRef,
  contentRef,
}: PreviewPanelProps) {
  const [isHandleResizing, setIsHandleResizing] = React.useState(false);

  const bgPattern = `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rpr-relative rpr-z-10 rpr-rounded-sm rpr-border-0 rpr-border-[#0000001f] rpr-bg-clip-padding rpr-bg-[#0000000f] !rpr-overflow-visible"
      style={{ backgroundImage: bgPattern }}
    >
      <ResizablePanel
        ref={panelRef}
        className={cn(
          `rpr-border ${className}`,
          !isHandleResizing &&
            "rpr-transition-all rpr-duration-300 rpr-ease-in-out"
        )}
        defaultSize={100}
        minSize={20}
      >
        <div ref={contentRef}>{children}</div>
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="rpr-z-50 rpr-w-0"
        onDragging={(e) => setIsHandleResizing(e)}
      />
      <ResizablePanel defaultSize={0} minSize={0} />
    </ResizablePanelGroup>
  );
}
