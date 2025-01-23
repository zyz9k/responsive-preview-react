// lib/types.ts
export interface ScaleConfig {
  showLabels?: boolean;
  showSigns?: boolean;
}

export interface PreviewConfig {
  darkMode?: boolean;
  showToolbar?: boolean;
  showScale?: boolean;
  scaleConfig?: ScaleConfig;
}
