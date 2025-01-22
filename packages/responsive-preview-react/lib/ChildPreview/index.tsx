"use client";
import * as React from "react";
import { PreviewWrapper } from "../PreviewWrapper";

interface ChildPreviewProps {
  children?: React.ReactNode;
}

export function ChildPreview({ children }: ChildPreviewProps) {
  return <PreviewWrapper>{children}</PreviewWrapper>;
}
