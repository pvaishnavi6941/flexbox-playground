import { LayoutPreset } from '@/types/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LayoutGalleryProps {
  presets: LayoutPreset[];
  selectedPreset: LayoutPreset;
  onPresetSelect: (preset: LayoutPreset) => void;
}

export const LayoutGallery = ({ presets, selectedPreset, onPresetSelect }: LayoutGalleryProps) => {
  return (
    <div className="w-80 bg-control-panel border-r border-border p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Layout Gallery</h2>
        <p className="text-sm text-muted-foreground">
          Choose a predefined layout to get started
        </p>
      </div>

      <div className="space-y-3">
        {presets.map((preset) => (
          <Card
            key={preset.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedPreset.id === preset.id
                ? 'ring-2 ring-primary bg-accent'
                : 'hover:bg-accent/50'
            }`}
            onClick={() => onPresetSelect(preset)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl font-mono text-primary">
                  {preset.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{preset.name}</h3>
                  <p className="text-xs text-muted-foreground">{preset.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="secondary" className="text-xs">
                  {preset.itemCount} items
                </Badge>
                {selectedPreset.id === preset.id && (
                  <Badge className="text-xs">Active</Badge>
                )}
              </div>

              {/* Mini preview */}
              <div className="mt-3 p-2 bg-background rounded border">
                <div
                  className="flex gap-1 min-h-[24px]"
                  style={{
                    flexDirection: preset.properties.flexDirection,
                    justifyContent: preset.properties.justifyContent,
                    alignItems: preset.properties.alignItems,
                    flexWrap: preset.properties.flexWrap,
                    gap: `${Math.min(preset.properties.gap, 4)}px`,
                  }}
                >
                  {Array.from({ length: Math.min(preset.itemCount, 4) }, (_, i) => (
                    <div
                      key={i}
                      className="bg-primary/20 rounded text-xs flex items-center justify-center min-w-[16px] min-h-[16px] text-primary font-bold"
                      style={{
                        width: preset.name === 'Stretch Middle' && i === 1 ? '100%' : '16px',
                        height: preset.properties.flexDirection.includes('column') ? '12px' : '16px',
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};