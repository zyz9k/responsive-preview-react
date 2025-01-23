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
import { Fullscreen, Pause, Play } from "lucide-react";
import type { Breakpoint } from "../breakpoints";
import React from "react";

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
  const [isPlaying, setIsPlaying] = React.useState(false);

  const play = React.useCallback(
    (intervalMs: number, onChange: (value: string) => void) => {
      let index = 0;

      const start = () => {
        const breakpoints = availableBreakpoints.filter((bp) => bp.show);
        return setInterval(() => {
          const bp = breakpoints[index];
          onChange(bp?.percentage?.toString() || "100");
          index = (index + 1) % breakpoints.length;
        }, intervalMs);
      };

      return { start };
    },
    [availableBreakpoints]
  );

  // React.useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (isPlaying) {
  //     interval = play(500, onBreakpointChange).start();
  //   }
  //   return () => clearInterval(interval);
  // }, [isPlaying, play, onBreakpointChange]);

  return (
    <div className="rpr-grow rpr-flex rpr-items-center rpr-justify-between prp-mr-[12px]">
      <div className="rpr-py-2 rpr-text-xs">
        Width: {width}px ({Number((width / maxWidth) * 100).toFixed(1)}%)
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
            <ToggleGroupItem
              value="play"
              onClick={() => setIsPlaying(!isPlaying)}
              className="rpr-h-[22px] rpr-w-[22px] rpr-min-w-0 rpr-rounded-sm rpr-p-0"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  {isPlaying ? (
                    <Pause className="rpr-h-3.5 rpr-w-3.5" />
                  ) : (
                    <Play className="rpr-h-3.5 rpr-w-3.5" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? "Pause" : "Play"}</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>

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
                    {/* {breakpoint?.percentage?.toString() || "0"} */}

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
