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
import {
  ChevronLeft,
  ChevronRight,
  MaximizeIcon,
  Pause,
  Play,
} from "lucide-react";
import type { Breakpoint } from "../breakpoints";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const currentIndex = availableBreakpoints.findIndex(
    (bp) => bp.title === breakpointTitle
  );

  const handlePrevBreakpoint = () => {
    if (currentIndex > 0) {
      const prevBp = availableBreakpoints[currentIndex - 1];
      onBreakpointChange(prevBp?.percentage?.toString() || "0");
    }
  };

  const handleNextBreakpoint = () => {
    if (currentIndex < availableBreakpoints.length - 1) {
      const nextBp = availableBreakpoints[currentIndex + 1];
      onBreakpointChange(nextBp?.percentage?.toString() || "0");
    }
  };

  const play = useCallback(() => {
    let index = 0;
    const breakpoints = availableBreakpoints;

    const start = () => {
      intervalRef.current = setInterval(() => {
        const bp = breakpoints[index];
        onBreakpointChange(bp?.percentage?.toString() || "100");
        //index = (index + 1) % breakpoints.length;
        index++;

        if (index >= breakpoints.length) {
          onBreakpointChange("100");
          stop();
          setIsPlaying(false);
        }
      }, 500);
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
      <div className="rpr-hidden rpr-h-7 rpr-items-center rpr-gap-1.5 rpr-rounded-md rpr-border rpr-p-[2px] rpr-shadow-none lg:rpr-flex">
        <TooltipProvider>
          <ToggleGroup type="multiple" className="rpr-flex rpr-items-center">
            <ToggleGroupItem
              value="play"
              onClick={togglePlay}
              data-state="off"
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

            <ToggleGroupItem
              value="prev"
              onClick={handlePrevBreakpoint}
              disabled={currentIndex <= 0}
              data-state="off"
              className="rpr-h-[22px] rpr-w-[22px] rpr-min-w-0 rpr-rounded-sm rpr-p-0"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ChevronLeft className="rpr-h-3.5 rpr-w-3.5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Previous Breakpoint</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>

            <ToggleGroupItem
              value="next"
              onClick={handleNextBreakpoint}
              data-state="off"
              disabled={currentIndex >= availableBreakpoints.length - 1}
              className="rpr-h-[22px] rpr-w-[22px] rpr-min-w-0 rpr-rounded-sm rpr-p-0"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ChevronRight className="rpr-h-3.5 rpr-w-3.5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Next Breakpoint</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </ToggleGroup>
        </TooltipProvider>
      </div>

      <div className="rpr-flex rpr-items-center rpr-gap-2 rpr-rounded-md rpr-bg-muted/40 rpr-px-3 rpr-py-1.5 rpr-w-50">
        <span className="rpr-flex rpr-items-center rpr-gap-1 rpr-text-xs rpr-font-medium">
          Width: <span className="rpr-font-mono">{width}px</span>
        </span>

        <span className="rpr-text-xs rpr-text-muted-foreground">
          ({Number((width / maxWidth) * 100).toFixed(1)}%)
        </span>

        {breakpointTitle && (
          <span className="rpr-rounded rpr-bg-primary/10 rpr-px-1.5 rpr-py-0.5 rpr-text-[10px] rpr-font-medium rpr-text-primary">
            {breakpointTitle}
          </span>
        )}
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
                  <MaximizeIcon className="rpr-h-3.5 rpr-w-3.5" />
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
