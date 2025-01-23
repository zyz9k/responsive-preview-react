// lib/types.ts
export interface ScaleConfig {
  showLabels?: boolean;
  showSigns?: boolean;
}

export interface PreviewConfig {
  showToolbar?: boolean;
  showScale?: boolean;
  scaleConfig?: ScaleConfig;
}
