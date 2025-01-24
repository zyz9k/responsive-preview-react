---
sidebar_position: 1
---

# Intro

A customizable React component for previewing responsive layouts across different viewport sizes.

## Features

- Interactive resizable preview panel with real-time width display
- Built-in breakpoint presets with device-specific icons
- Customizable breakpoint configurations
- Dark mode support
- Scale bar visualization with width markers
- Toggle controls for UI elements
- Supports both iframe and direct child element previews
- TypeScript support

## Installation

```bash
npm install @locospec/responsive-preview-react
```

## Basic Usage

For child content:

```tsx
import { ChildPreview } from "@locospec/responsive-preview-react";

function App() {
  return (
    <ChildPreview>
      <YourComponent />
    </ChildPreview>
  );
}
```

For iframe content:

```tsx
import { IFramePreview } from "@locospec/responsive-preview-react";

function App() {
  return <IFramePreview srcUrl="https://example.com" />;
}
```
