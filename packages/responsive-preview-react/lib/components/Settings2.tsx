import {
  LayoutPanelTop,
  ScaleIcon,
  TextIcon,
  SettingsIcon,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/base/components/ui/hover-card";
import { Switch } from "@/base/components/ui/switch";
import { Label } from "@/base/components/ui/label";
import type { PreviewConfig } from "../types";

interface SettingsProps {
  config: PreviewConfig;
  onChange: (config: PreviewConfig) => void;
}

export function Settings({ config, onChange }: SettingsProps) {
  const {
    darkMode = false,
    showToolbar = true,
    showScale = true,
    scaleConfig,
  } = config;
  const { showLabels = true, showSigns = true } = scaleConfig || {};

  const handleConfigChange = (
    key: keyof PreviewConfig | keyof Required<PreviewConfig>["scaleConfig"],
    value: boolean
  ) => {
    if (key === "showLabels" || key === "showSigns") {
      onChange({
        ...config,
        scaleConfig: { ...config.scaleConfig, [key]: value },
      });
    } else {
      onChange({ ...config, [key]: value });
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="rpr-h-[22px] rpr-w-[22px] rpr-rounded-sm rpr-p-0 rpr-flex rpr-items-center rpr-justify-center">
          <SettingsIcon className="rpr-h-3.5 rpr-w-3.5" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="rpr-w-80">
        <div className="rpr-space-y-4">
          <div className="rpr-flex rpr-items-center rpr-justify-between">
            <div className="rpr-flex rpr-items-center rpr-gap-2">
              <LayoutPanelTop className="rpr-h-4 rpr-w-4" />
              <Label>Dark Mode</Label>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={(v) => handleConfigChange("darkMode", v)}
            />
          </div>

          <div className="rpr-flex rpr-items-center rpr-justify-between">
            <div className="rpr-flex rpr-items-center rpr-gap-2">
              <LayoutPanelTop className="rpr-h-4 rpr-w-4" />
              <Label>Toolbar</Label>
            </div>
            <Switch
              checked={showToolbar}
              onCheckedChange={(v) => handleConfigChange("showToolbar", v)}
            />
          </div>

          <div className="rpr-flex rpr-items-center rpr-justify-between">
            <div className="rpr-flex rpr-items-center rpr-gap-2">
              <ScaleIcon className="rpr-h-4 rpr-w-4" />
              <Label>Scale Bar</Label>
            </div>
            <Switch
              checked={showScale}
              onCheckedChange={(v) => handleConfigChange("showScale", v)}
            />
          </div>

          {showScale && (
            <div className="rpr-ml-6 rpr-space-y-3">
              <div className="rpr-flex rpr-items-center rpr-justify-between">
                <div className="rpr-flex rpr-items-center rpr-gap-2">
                  <TextIcon className="rpr-h-4 rpr-w-4" />
                  <Label>Labels</Label>
                </div>
                <Switch
                  checked={showLabels}
                  onCheckedChange={(v) => handleConfigChange("showLabels", v)}
                />
              </div>

              <div className="rpr-flex rpr-items-center rpr-justify-between">
                <div className="rpr-flex rpr-items-center rpr-gap-2">
                  {/* <LineHeight className="rpr-h-4 rpr-w-4" /> */}
                  <Label>Markers</Label>
                </div>
                <Switch
                  checked={showSigns}
                  onCheckedChange={(v) => handleConfigChange("showSigns", v)}
                />
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
