"use client";
import * as React from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/base/components/ui/resizable";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/base/components/ui/toggle-group";
import { breakpoints, getBreakpoint } from "./breakpoints";
import type { Breakpoint } from "./breakpoints";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/base/components/ui/tooltip";
import { cn } from "./base/lib/utils";
import { Fullscreen } from "lucide-react";
import { Toolbar } from "./components/Toolbar";
import { ScaleBar } from "./components/ScaleBar";

interface PreviewWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export function PreviewWrapper({ children, className }: PreviewWrapperProps) {
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null);
  const [width, setWidth] = React.useState<number>(0);
  const [maxWidth, setMaxWidth] = React.useState<number>(0);
  const panelContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (width > maxWidth) {
      setMaxWidth(width);
    }
  }, [width]);

  React.useEffect(() => {
    if (!panelContentRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setWidth(Math.round(width));
    });

    observer.observe(panelContentRef.current);
    return () => observer.disconnect();
  }, []);

  const availableBreakpoints = React.useMemo(() => {
    return breakpoints.map((breakpoint: Breakpoint) => {
      breakpoint.percentage = Math.ceil(
        (breakpoint.minWidthPx * 100) / maxWidth
      );
      if (breakpoint.percentage > 100) {
        breakpoint.percentage = 100;
        breakpoint.show = false;
      } else {
        breakpoint.show = true;
      }
      return breakpoint;
    });
  }, [maxWidth]);

  const currentBreakpoint = getBreakpoint(width);

  return (
    <div className="twp rpr-grid rpr-w-full rpr-gap-2 rpr-p-4 rpr-bg-red-50">
      <Toolbar
        width={width}
        maxWidth={maxWidth}
        breakpointTitle={currentBreakpoint?.title}
        availableBreakpoints={availableBreakpoints}
        onBreakpointChange={(value) => {
          if (resizablePanelRef?.current) {
            resizablePanelRef.current.resize(parseInt(value));
          }
        }}
      />

      <ScaleBar
        width={width}
        maxWidth={maxWidth}
        currentBreakpoint={currentBreakpoint?.title}
        breakpoints={availableBreakpoints}
      />

      <ResizablePanelGroup
        direction="horizontal"
        className="rpr-mt-4 rpr-relative rpr-z-10 rpr-rounded-sm rpr-border-0 rpr-border-[#0000001f] rpr-bg-clip-padding rpr-bg-[#0000000f] !rpr-overflow-visible"
        style={{
          // backgroundColor: "#0000000f",
          // backgroundClip: "padding-box",
          // border: "1px solid #0000001f",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <ResizablePanel
          ref={resizablePanelRef}
          className={`rpr-border ${className}`}
          defaultSize={100}
          minSize={20}
        >
          <div ref={panelContentRef}>{children}</div>
        </ResizablePanel>
        <ResizableHandle withHandle className="rpr-z-50 rpr-w-0" />
        {/* <ResizableHandle className="rpr-relative rpr-hidden rpr-w-3 rpr-bg-transparent rpr-p-0 after:rpr-absolute after:rpr-right-0 after:rpr-top-1/2 after:rpr-h-8 after:rpr-w-[6px] after:-rpr-translate-y-1/2 after:rpr-translate-x-[-3px] after:rpr-rounded-full after:rpr-bg-gray-300 after:rpr-transition-all after:hover:rpr-h-10 md:rpr-block" /> */}
        <ResizablePanel defaultSize={0} minSize={0} />
      </ResizablePanelGroup>
    </div>
  );
}
