---
sidebar_position: 1
---

# Installation

**Run the following command to install the package:**

```bash
npm install @locospec/responsive-preview-react
```

**Import the styles in your project:**

```
@import "@locospec/responsive-preview-react/styles.css";
```

Note: You can also use yarn, pnpm etc.,

## Preview Child Component

```tsx
import { ChildPreview } from "@locospec/responsive-preview-react";

function App() {
  return (
    <ChildPreview>
      <Child />
    </ChildPreview>
  );
}
```

`<Child />` is any component, but for responsive to work properly, it should be a responsive component. You might use container queries of Tailwind to implement such a component.

## Preview IFrame

```tsx
import { IFramePreview } from "@locospec/responsive-preview-react";

function App() {
  return <IFramePreview srcUrl="https://example.com" />;
}
```

Every website doesn't support embedding into an iframe. If you see a blank screen, it's likely that the website has disabled embedding.
