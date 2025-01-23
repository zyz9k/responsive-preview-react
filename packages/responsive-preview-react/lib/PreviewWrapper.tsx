"use client";
import * as React from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { breakpoints, getBreakpoint } from "./breakpoints";
import type { Breakpoint } from "./breakpoints";
import { Toolbar } from "./components/Toolbar";
import { ScaleBar } from "./components/ScaleBar";
import { PreviewPanel } from "./components/PreviewPanel";

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
        maxWidth={maxWidth}
        currentBreakpoint={currentBreakpoint?.title}
        breakpoints={availableBreakpoints}
      />

      <PreviewPanel
        panelRef={resizablePanelRef}
        contentRef={panelContentRef}
        className={className}
      >
        {children}
      </PreviewPanel>
    </div>
  );
}
