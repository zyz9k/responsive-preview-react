import { cn } from "@/base/lib/utils";
import type { Breakpoint } from "../breakpoints";
import type { ScaleConfig } from "../types";

interface MarkerProps {
  label: string;
  sublabel: string;
  position?: number;
  isValid?: boolean;
  isCurrent?: boolean;
  isDull?: boolean;
}

interface ScaleBarProps {
  width: number;
  maxWidth: number;
  currentBreakpoint?: string;
  breakpoints: Breakpoint[];
  config?: ScaleConfig;
}

interface SignProps {
  position?: number;
  isCurrent?: boolean;
  isDull?: boolean;
}

function Marker({
  label,
  sublabel,
  position,
  isCurrent,
  isValid,
  isDull = false,
}: MarkerProps) {
  return (
    <div
      className={cn(
        "rpr-absolute rpr-flex rpr-flex-col rpr-items-center rpr-translate-x-[-50%] rpr-text-gray-400 dark:rpr-text-gray-200 rpr-text-xs whitespace-nowrap rpr-font-normal",
        isCurrent && "!rpr-font-bold",
        isValid && "rpr-font-medium rpr-text-gray-500 dark:rpr-text-gray-300",
        isDull && "rpr-font-thin"
      )}
      style={position !== undefined ? { left: `${position}px` } : undefined}
    >
      <span>{label}</span>
      <span>{sublabel}</span>
    </div>
  );
}

function MarkerScale({
  width,
  maxWidth,
  currentBreakpoint,
  breakpoints,
}: ScaleBarProps) {
  return (
    <div className="rpr-relative rpr-w-full rpr-h-8">
      <Marker label="0" sublabel="0rem" isDull />

      {breakpoints
        .filter((breakpoint) => breakpoint.show)
        .map((breakpoint: Breakpoint) => (
          <Marker
            key={breakpoint.title}
            label={breakpoint.title}
            sublabel={`${breakpoint.minWidthPx}px`}
            position={breakpoint.minWidthPx}
            isCurrent={currentBreakpoint === breakpoint.title}
            isValid={width > breakpoint.minWidthPx}
          />
        ))}

      <Marker
        label="max"
        sublabel={`${maxWidth}px`}
        position={maxWidth}
        isDull
      />
    </div>
  );
}

function Sign({ position, isCurrent, isDull = false }: SignProps) {
  return (
    <div
      className={cn(
        "rpr-absolute rpr-h-full rpr-border-l rpr-border-gray-300",
        isCurrent && "rpr-font-bold",
        isDull && "rpr-opacity-50"
      )}
      style={position !== undefined ? { left: `${position}px` } : undefined}
    />
  );
}

function SignScale({
  maxWidth,
  currentBreakpoint,
  breakpoints,
}: ScaleBarProps) {
  return (
    <div className="rpr-relative rpr-w-full rpr-h-4">
      <div className="rpr-absolute rpr-top-1/2 rpr-w-full rpr-border-t rpr-border-gray-300" />
      <Sign isDull />

      {breakpoints
        .filter((breakpoint) => breakpoint.show)
        .map((breakpoint: Breakpoint) => (
          <Sign
            key={breakpoint.title}
            position={breakpoint.minWidthPx}
            isCurrent={currentBreakpoint === breakpoint.title}
          />
        ))}

      <Sign position={maxWidth} isDull />
    </div>
  );
}

export function ScaleBar({
  width,
  maxWidth,
  currentBreakpoint,
  breakpoints,
  config = {},
}: ScaleBarProps) {
  const { showLabels = true, showSigns = true } = config;

  return (
    <>
      <div className="rpr-grid rpr-gap-1">
        {showLabels && (
          <MarkerScale
            width={width}
            maxWidth={maxWidth}
            currentBreakpoint={currentBreakpoint}
            breakpoints={breakpoints}
          />
        )}

        {showSigns && (
          <SignScale
            width={width}
            maxWidth={maxWidth}
            currentBreakpoint={currentBreakpoint}
            breakpoints={breakpoints}
          />
        )}
      </div>
    </>
  );
}
