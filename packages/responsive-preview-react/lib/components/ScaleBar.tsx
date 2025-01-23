import { cn } from "@/base/lib/utils";
import type { Breakpoint } from "../breakpoints";

interface BreakpointMarkerProps {
  label: string;
  sublabel: string;
  position?: number;
  isCurrent?: boolean;
  isDull?: boolean;
}

function Marker({
  label,
  sublabel,
  position,
  isCurrent,
  isDull = false,
}: BreakpointMarkerProps) {
  return (
    <div
      className={cn(
        "rpr-absolute rpr-flex rpr-flex-col rpr-items-center rpr-translate-x-[-50%] rpr-text-gray-600 rpr-text-xs whitespace-nowrap",
        isCurrent && "rpr-font-bold",
        isDull && "rpr-opacity-50"
      )}
      style={position !== undefined ? { left: `${position}px` } : undefined}
    >
      <span>{label}</span>
      <span>{sublabel}</span>
      <div
        className={cn(
          "rpr-h-4 rpr-w-px rpr-bg-gray-400",
          isCurrent && "rpr-bg-gray-600"
        )}
      />
    </div>
  );
}

interface ScaleBarProps {
  maxWidth: number;
  currentBreakpoint?: string;
  breakpoints: Breakpoint[];
}

export function ScaleBar({
  maxWidth,
  currentBreakpoint,
  breakpoints,
}: ScaleBarProps) {
  return (
    <div className="rpr-relative rpr-w-full rpr-h-10">
      <div className="rpr-w-full rpr-relative">
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
            />
          ))}

        <Marker
          label="max"
          sublabel={`${maxWidth}px`}
          position={maxWidth}
          isDull
        />
      </div>

      <div className="rpr-absolute rpr-top-0 rpr-h-10 rpr-w-full rpr-border-b rpr-border-gray-300" />
    </div>
  );
}
