import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/base/components/ui/tooltip";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/base/components/ui/toggle-group";
import { Fullscreen } from "lucide-react";
import type { Breakpoint } from "../breakpoints";

interface ToolbarProps {
  width: number;
  maxWidth: number;
  breakpointTitle?: string;
  availableBreakpoints: Breakpoint[];
  onBreakpointChange: (value: string) => void;
}

export function Toolbar({
  width,
  maxWidth,
  breakpointTitle,
  availableBreakpoints,
  onBreakpointChange,
}: ToolbarProps) {
  return (
    <div className="rpr-flex rpr-items-center rpr-justify-between prp-mr-[12px]">
      <div className="rpr-py-2 rpr-text-xs">
        Width: {width}px ({Math.round((width / maxWidth) * 100)}%)
        {breakpointTitle ? `[${breakpointTitle}]` : ""}
      </div>

      <div className="rpr-hidden rpr-h-7 rpr-items-center rpr-gap-1.5 rpr-rounded-md rpr-border rpr-p-[2px] rpr-shadow-none lg:rpr-flex">
        <TooltipProvider>
          <ToggleGroup
            type="single"
            defaultValue="100"
            onValueChange={onBreakpointChange}
            className="rpr-flex rpr-items-center"
          >
            {availableBreakpoints
              .filter((breakpoint) => breakpoint.show)
              .map((breakpoint: Breakpoint) => {
                const Icon = breakpoint.icon;
                return (
                  <ToggleGroupItem
                    data-state={
                      breakpointTitle === breakpoint.title ? "on" : "off"
                    }
                    value={breakpoint?.percentage?.toString() || "0"}
                    key={breakpoint.title}
                    className="rpr-h-[22px] rpr-w-[22px] rpr-min-w-0 rpr-rounded-sm rpr-p-0"
                    title={`${breakpoint.title} (${breakpoint.minWidthPx}px)`}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Icon className="rpr-h-3.5 rpr-w-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {breakpoint.title} ({breakpoint.minWidthPx}px)
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </ToggleGroupItem>
                );
              })}

            <ToggleGroupItem
              data-state="off"
              value="100"
              className="rpr-h-[22px] rpr-w-[22px] rpr-min-w-0 rpr-rounded-sm rpr-p-0"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Fullscreen className="rpr-h-3.5 rpr-w-3.5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Full Width</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </ToggleGroup>
        </TooltipProvider>
      </div>
    </div>
  );
}
