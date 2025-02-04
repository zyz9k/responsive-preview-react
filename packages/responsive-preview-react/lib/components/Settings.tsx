import {
  LayoutPanelTop,
  RulerIcon,
  TextIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/base/components/ui/popover";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/base/components/ui/toggle-group";
import type { PreviewConfig } from "../types";

interface SettingsProps {
  config: PreviewConfig;
  onChange: (config: PreviewConfig) => void;
  rprRef: React.RefObject<HTMLDivElement>;
}

export function Settings({ config, onChange, rprRef }: SettingsProps) {
  const {
    // darkMode = false,
    showToolbar = true,
    showLabels = true,
    showScale = true,
  } = config;

  // console.log("showToolbar", showToolbar);

  const handleConfigChange = (key: string, value: boolean) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rpr-h-[22px] rpr-w-[22px] rpr-rounded-sm rpr-p-0">
          <SettingsIcon className="rpr-h-3.5 rpr-w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent portalRef={rprRef} className="rpr-w-fit" data-side="top">
        <ToggleGroup
          type="multiple"
          variant="outline"
          className="rpr-flex rpr-gap-1"
        >
          {/* <ToggleGroupItem
            value="darkMode"
            data-state={darkMode ? "on" : "off"}
            onClick={() => handleConfigChange("darkMode", !darkMode)}
            className="rpr-p-2"
          >
            <MoonIcon className="rpr-h-4 rpr-w-4" />
          </ToggleGroupItem> */}
          <ToggleGroupItem
            value="showToolbar"
            data-state={showToolbar ? "on" : "off"}
            onClick={() => handleConfigChange("showToolbar", !showToolbar)}
            className="rpr-p-2"
          >
            <LayoutPanelTop className="rpr-h-4 rpr-w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="showLabels"
            data-state={showLabels ? "on" : "off"}
            onClick={() => handleConfigChange("showLabels", !showLabels)}
            className="rpr-p-2"
          >
            <TextIcon className="rpr-h-4 rpr-w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="showScale"
            data-state={showScale ? "on" : "off"}
            onClick={() => handleConfigChange("showScale", !showScale)}
            className="rpr-p-2"
          >
            <RulerIcon className="rpr-h-4 rpr-w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
}
