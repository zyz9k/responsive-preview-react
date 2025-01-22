"use client";
import * as React from "react";
import { PreviewWrapper } from "../PreviewWrapper";

interface IFramePreviewProps {
  srcUrl: string;
  height?: number;
  colorMode: string;
}

export function IFramePreview({
  srcUrl,
  height,
  colorMode,
}: IFramePreviewProps) {
  React.useEffect(() => {
    const updateIframeTheme = (theme: string): void => {
      const iframe = document.querySelector("iframe");
      if (iframe && iframe.contentDocument) {
        iframe.contentDocument.documentElement.setAttribute(
          "data-theme",
          theme
        );
      }
    };

    updateIframeTheme(colorMode);
  }, [colorMode]);

  return (
    <PreviewWrapper>
      <iframe
        allow="cross-origin-isolated"
        src={srcUrl}
        height={height || 930}
        className="relative z-20 hidden w-full bg-background md:block"
      />
    </PreviewWrapper>
  );
}
