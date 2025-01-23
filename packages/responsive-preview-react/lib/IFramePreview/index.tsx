"use client";
import type { BreakpointConfig } from "@/breakpoints";
import { PreviewWrapper } from "../PreviewWrapper";
import type { PreviewConfig } from "../types";

interface IFramePreviewProps {
  srcUrl: string;
  height?: number;
  colorMode: string;
  breakpoints?: BreakpointConfig[];
  config?: PreviewConfig;
}

export function IFramePreview({
  srcUrl,
  height,
  breakpoints,
  config,
}: IFramePreviewProps) {
  // React.useEffect(() => {
  //   const updateIframeTheme = (theme: string): void => {
  //     const iframe = document.querySelector("iframe");
  //     if (iframe && iframe.contentDocument) {
  //       iframe.contentDocument.documentElement.setAttribute(
  //         "data-theme",
  //         theme
  //       );
  //     }
  //   };

  //   updateIframeTheme(colorMode);
  // }, [colorMode]);

  return (
    <PreviewWrapper breakpoints={breakpoints} config={config}>
      <iframe
        allow="cross-origin-isolated"
        src={srcUrl}
        height={height || 930}
        className="rpr-relative rpr-z-20 rpr-hidden rpr-w-full rpr-bg-black-50 md:rpr-block"
      />
    </PreviewWrapper>
  );
}
