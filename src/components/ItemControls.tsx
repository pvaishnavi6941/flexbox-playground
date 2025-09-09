import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Code } from 'lucide-react';
import { LayoutItem } from '@/types/layout';

interface ItemControlsProps {
  items: LayoutItem[];
  onAddItem: () => void;
  onRemoveItem: () => void;
  onGetCode: () => void;
  maxItems?: number;
  minItems?: number;
}

export const ItemControls = ({ 
  items, 
  onAddItem, 
  onRemoveItem, 
  onGetCode,
  maxItems = 12,
  minItems = 1 
}: ItemControlsProps) => {
  return (
    <div className="w-80 bg-control-panel border-l border-border p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Item Controls</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Manage the items in your layout
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            Layout Items
            <Badge variant="outline">{items.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onAddItem}
              disabled={items.length >= maxItems}
              className="flex-1 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRemoveItem}
              disabled={items.length <= minItems}
              className="flex-1 gap-2"
            >
              <Minus className="h-4 w-4" />
              Remove
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Items: {minItems}-{maxItems} • Current: {items.length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Export Code</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onGetCode}
            className="w-full gap-2"
            variant="default"
          >
            <Code className="h-4 w-4" />
            Get Code
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Generate HTML & Tailwind CSS code for this layout
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Current Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-playground-item1 rounded p-2 text-center text-white text-xs font-bold min-h-[32px] flex items-center justify-center"
                style={{
                  background: `hsl(${220 + (index * 30) % 360}, 70%, ${50 + (index * 10) % 30}%)`,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};