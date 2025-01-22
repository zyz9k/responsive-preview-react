"use client";
import * as React from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { breakpoints, getBreakpoint } from "./breakpoints";
import type { Breakpoint } from "./breakpoints";
import { Button, Skeleton, Text, Theme } from "@radix-ui/themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

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
      }
      return breakpoint;
    });
  }, [maxWidth]);

  return (
    <Theme>
      <div className="grid w-full gap-4">
        <Text>
          <Skeleton
            className="bg-gray-300"
            style={{
              backgroundColor: "var(--gray-3) !important",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna. Nam magna erat, fringilla sed commodo sed, aliquet nec magna.
          </Skeleton>
        </Text>

        <div className="flex items-center justify-between mr-[12px]">
          <div className="py-2 text-xs">
            Width: {width}px (
            {resizablePanelRef.current && resizablePanelRef.current.getSize()}%)
            [{getBreakpoint(width)?.title}]
          </div>

          {/* {JSON.stringify(availableBreakpoints)} */}

          <div className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
            <TooltipProvider>
              <ToggleGroup
                type="single"
                defaultValue="100"
                onValueChange={(value) => {
                  if (resizablePanelRef?.current) {
                    resizablePanelRef.current.resize(parseInt(value));
                  }
                }}
                className="flex items-center"
              >
                {availableBreakpoints.map((breakpoint: Breakpoint) => {
                  const Icon = breakpoint.icon;
                  return (
                    <ToggleGroupItem
                      data-state={
                        getBreakpoint(width)?.title === breakpoint.title
                          ? "on"
                          : "off"
                      }
                      value={breakpoint?.percentage?.toString() || "0"}
                      key={breakpoint.title}
                      className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
                      title={`${breakpoint.title} (${breakpoint.minWidthPx}px)`}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icon className="h-3.5 w-3.5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            `${breakpoint.title} (${breakpoint.minWidthPx}px)`
                          </p>
                        </TooltipContent>
                      </Tooltip>

                      {/* <span className="text-xs">{breakpoint.title}</span> */}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </TooltipProvider>
          </div>
        </div>

        <ResizablePanelGroup
          direction="horizontal"
          className="relative z-10 bg-gray-50"
        >
          <ResizablePanel
            ref={resizablePanelRef}
            className={`border ${className}`}
          >
            <div ref={panelContentRef}>{children}</div>
          </ResizablePanel>
          <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </Theme>
  );
}
