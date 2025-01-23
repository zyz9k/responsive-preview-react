"use client";
import * as React from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { defaultBreakpoints, getBreakpoint } from "./breakpoints";
import type { Breakpoint, BreakpointConfig } from "./breakpoints";
import { Toolbar } from "./components/Toolbar";
import { ScaleBar } from "./components/ScaleBar";
import { PreviewPanel } from "./components/PreviewPanel";
import type { PreviewConfig } from "./types";
import { Settings } from "./components/Settings";
import { cn } from "./base/lib/utils";

interface PreviewWrapperProps {
  children?: React.ReactNode;
  className?: string;
  breakpoints?: BreakpointConfig[];
  config?: PreviewConfig;
}

export function PreviewWrapper({
  children,
  className,
  breakpoints = defaultBreakpoints,
  config: initialConfig = {
    darkMode: false,
    showToolbar: true,
    showScale: true,
    scaleConfig: {
      showLabels: true,
      showSigns: true,
    },
  },
}: PreviewWrapperProps) {
  const [config, setConfig] = React.useState<PreviewConfig>(initialConfig);
  const {
    darkMode = false,
    showToolbar = true,
    showScale = true,
    scaleConfig,
  } = config;
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null);
  const [width, setWidth] = React.useState<number>(0);
  const [maxWidth, setMaxWidth] = React.useState<number>(0);
  const panelContentRef = React.useRef<HTMLDivElement>(null);
  const rprRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setConfig(initialConfig);
  }, [initialConfig]);

  React.useEffect(() => {
    if (width > maxWidth) {
      setMaxWidth(width);
    }
  }, [width, maxWidth]);

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
      // breakpoint.percentage = Math.ceil(
      //   (breakpoint.minWidthPx * 100) / maxWidth
      // );

      breakpoint.percentage = (breakpoint.minWidthPx * 100) / maxWidth;

      if (breakpoint.percentage > 100) {
        breakpoint.percentage = 100;
        breakpoint.show = false;
      } else {
        breakpoint.show = true;
      }
      return breakpoint;
    });
  }, [maxWidth, breakpoints]);

  const currentBreakpoint = getBreakpoint(width, breakpoints);

  return (
    <div className="twp">
      <div className={cn(darkMode && "rpr-dark dark")}>
        <div
          className="rpr-grid rpr-w-full rpr-gap-4 rpr-p-8 rpr-bg-gray-50 dark:rpr-bg-gray-900 rpr-rounded-md rpr-text-gray-800 dark:rpr-text-white"
          ref={rprRef}
        >
          <div className="rpr-flex rpr-items-center rpr-justify-between">
            <Settings config={config} onChange={setConfig} rprRef={rprRef} />

            {showToolbar && (
              <Toolbar
                width={width}
                maxWidth={maxWidth}
                breakpointTitle={currentBreakpoint?.title}
                availableBreakpoints={availableBreakpoints}
                onBreakpointChange={(value) => {
                  console.log("value", value, parseFloat(value));
                  if (resizablePanelRef?.current) {
                    resizablePanelRef.current.resize(parseFloat(value));
                  }
                }}
              />
            )}
          </div>

          {showScale && (
            <ScaleBar
              maxWidth={maxWidth}
              currentBreakpoint={currentBreakpoint?.title}
              breakpoints={availableBreakpoints}
              config={scaleConfig}
            />
          )}

          <PreviewPanel
            panelRef={resizablePanelRef}
            contentRef={panelContentRef}
            className={className}
          >
            {children}
          </PreviewPanel>
        </div>
      </div>
    </div>
  );
}
