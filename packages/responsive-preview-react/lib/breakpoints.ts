import {
  DoorClosedIcon,
  Monitor,
  MonitorCheck,
  MonitorDot,
  MonitorPlay,
  MonitorSpeaker,
  MonitorUp,
  Smartphone,
  Tablet,
  TabletSmartphone,
  Tv,
  type LucideProps,
} from "lucide-react";

export interface Breakpoint {
  title: string;
  minWidthRem: number;
  minWidthPx: number;
  percentage?: number;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const breakpoints: Breakpoint[] = [
  {
    title: "xxs",
    minWidthRem: 0,
    minWidthPx: 0,
    icon: DoorClosedIcon,
  },
  {
    title: "xs",
    minWidthRem: 20,
    minWidthPx: 320,
    icon: Smartphone,
  },
  {
    title: "sm",
    minWidthRem: 24,
    minWidthPx: 384,
    icon: TabletSmartphone,
  },
  {
    title: "md",
    minWidthRem: 28,
    minWidthPx: 448,
    icon: Tablet,
  },
  {
    title: "lg",
    minWidthRem: 32,
    minWidthPx: 512,
    icon: Monitor,
  },
  {
    title: "xl",
    minWidthRem: 36,
    minWidthPx: 576,
    icon: MonitorUp,
  },
  {
    title: "2xl",
    minWidthRem: 42,
    minWidthPx: 672,
    icon: Tv,
  },
  {
    title: "3xl",
    minWidthRem: 48,
    minWidthPx: 768,
    icon: MonitorPlay,
  },
  {
    title: "4xl",
    minWidthRem: 56,
    minWidthPx: 896,
    icon: Monitor,
  },
  {
    title: "5xl",
    minWidthRem: 64,
    minWidthPx: 1024,
    icon: MonitorDot,
  },
  {
    title: "6xl",
    minWidthRem: 72,
    minWidthPx: 1152,
    icon: MonitorCheck,
  },
  {
    title: "7xl",
    minWidthRem: 80,
    minWidthPx: 1280,
    icon: MonitorSpeaker,
  },
];

export function getBreakpoint(currentWidth: number): Breakpoint | undefined {
  // Sort breakpoints from largest to smallest
  const sortedBreakpoints = [...breakpoints].sort(
    (a, b) => b.minWidthPx - a.minWidthPx
  );

  // Find the first (largest) breakpoint where the current width is greater than or equal to its minimum
  return sortedBreakpoints.find(
    (breakpoint) => currentWidth >= breakpoint.minWidthPx
  );
}
