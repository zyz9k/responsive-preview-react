"use client";
import * as React from "react";
import { PreviewWrapper } from "../PreviewWrapper";
import type { BreakpointConfig } from "@/breakpoints";

interface ChildPreviewProps {
  children?: React.ReactNode;
  breakpoints?: BreakpointConfig[];
}

export function ChildPreview({ children, breakpoints }: ChildPreviewProps) {
  return <PreviewWrapper breakpoints={breakpoints}>{children}</PreviewWrapper>;
}
