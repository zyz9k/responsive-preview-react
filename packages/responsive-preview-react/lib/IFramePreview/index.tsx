"use client";
import type { BreakpointConfig } from "@/breakpoints";
import { PreviewWrapper } from "../PreviewWrapper";

interface IFramePreviewProps {
  srcUrl: string;
  height?: number;
  colorMode: string;
  breakpoints?: BreakpointConfig[];
}

export function IFramePreview({
  srcUrl,
  height,
  breakpoints,
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
    <PreviewWrapper breakpoints={breakpoints}>
      <iframe
        allow="cross-origin-isolated"
        src={srcUrl}
        height={height || 930}
        className="rpr-relative rpr-z-20 rpr-hidden rpr-w-full rpr-bg-black-50 md:rpr-block"
      />
    </PreviewWrapper>
  );
}
