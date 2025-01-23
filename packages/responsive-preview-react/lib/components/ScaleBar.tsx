import { cn } from "@/base/lib/utils";
import type { Breakpoint } from "../breakpoints";

interface BreakpointMarkerProps {
  label: string;
  sublabel: string;
  position?: number;
  isCurrent?: boolean;
}

function Marker({
  label,
  sublabel,
  position,
  isCurrent,
}: BreakpointMarkerProps) {
  return (
    <div
      className={cn(
        "rpr-absolute rpr-flex rpr-flex-col rpr-items-center rpr-translate-x-[-50%]",
        isCurrent && "rpr-font-bold"
      )}
      style={position !== undefined ? { left: `${position}px` } : undefined}
    >
      <span className="rpr-text-xs rpr-text-gray-600 whitespace-nowrap">
        {label}
      </span>
      <span className="rpr-text-xs rpr-text-gray-600 whitespace-nowrap">
        {sublabel}
      </span>
      <div className="rpr-h-4 rpr-w-px rpr-bg-gray-400" />
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
        <Marker label="0" sublabel="0rem" />

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

        <Marker label="max" sublabel={`${maxWidth}px`} position={maxWidth} />
      </div>

      <div className="rpr-absolute rpr-top-0 rpr-h-9 rpr-w-full rpr-border-b rpr-border-gray-300" />
    </div>
  );
}
