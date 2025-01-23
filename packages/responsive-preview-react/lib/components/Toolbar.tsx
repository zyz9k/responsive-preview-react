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
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const play = useCallback(() => {
    let index = 0;
    const breakpoints = availableBreakpoints.filter((bp) => bp.show);

    const start = () => {
      intervalRef.current = setInterval(() => {
        const bp = breakpoints[index];
        onBreakpointChange(bp?.percentage?.toString() || "100");
        //index = (index + 1) % breakpoints.length;
        index++;

        if (index >= breakpoints.length) {
          stop();
          setIsPlaying(false);
        }
      }, 1000);
    };

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };

    return { start, stop };
  }, [availableBreakpoints, onBreakpointChange]);

  const togglePlay = () => {
    const player = play();
    if (!isPlaying) {
      player.start();
    } else {
      player.stop();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
              onClick={togglePlay}
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
