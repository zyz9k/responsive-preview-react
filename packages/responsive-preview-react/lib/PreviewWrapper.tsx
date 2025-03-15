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

const defaultConfig = {
  darkMode: false,
  showToolbar: true,
  showScale: true,
  showLabels: true,
};

export function PreviewWrapper({
  children,
  className,
  breakpoints = defaultBreakpoints,
  config: initialConfig = defaultConfig,
}: PreviewWrapperProps) {
  const [config, setConfig] = React.useState<PreviewConfig>(initialConfig);

  const {
    darkMode = false,
    showToolbar = true,
    showScale = true,
    showLabels = true,
  } = config;

  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null);
  const [width, setWidth] = React.useState<number>(0);
  const [maxWidth, setMaxWidth] = React.useState<number>(0);
  const panelContentRef = React.useRef<HTMLDivElement>(null);
  const rprRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    setConfig(initialConfig);
  }, [initialConfig]);

  // React.useEffect(() => {
  //   console.log(JSON.stringify(config), JSON.stringify(initialConfig));
  //   if (JSON.stringify(config) !== JSON.stringify(initialConfig)) {
  //     setConfig(initialConfig);
  //   }
  // }, [initialConfig]);

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
      <div
        className={cn(darkMode && "rpr-dark dark")}
        data-theme={darkMode ? "dark" : "light"}
      >
        <div
          className="rpr-relative rpr-grid rpr-w-full rpr-gap-4 rpr-p-0 rpr-bg-transparent dark:rpr-bg-transparent rpr-rounded-md rpr-text-gray-800 dark:rpr-text-white"
          ref={rprRef}
        >
          <div className="rpr-flex rpr-items-center rpr-justify-between rpr-min-h-9 rpr-space-x-2">
            <div className="rpr-flex-grow">
              {showToolbar && (
                <Toolbar
                  width={width}
                  maxWidth={maxWidth}
                  breakpointTitle={currentBreakpoint?.title}
                  availableBreakpoints={availableBreakpoints}
                  onBreakpointChange={(value) => {
                    if (resizablePanelRef?.current) {
                      resizablePanelRef.current.resize(parseFloat(value));
                    }
                  }}
                  panelRef={panelContentRef} // Add this line
                />
              )}
            </div>

            <div className="rpr-justify-end rpr-h-7 rpr-p-[2px]">
              <Settings
                config={config}
                onChange={(newConfig) => {
                  console.log("newConfig", newConfig);
                  setConfig(newConfig);
                }}
                rprRef={rprRef}
              />
            </div>
          </div>

          <ScaleBar
            width={width}
            maxWidth={maxWidth}
            currentBreakpoint={currentBreakpoint?.title}
            breakpoints={availableBreakpoints}
            showLabels={showLabels}
            showScale={showScale}
          />

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
