import { FlexboxProperties } from './FlexboxPlayground';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface ControlPanelProps {
  properties: FlexboxProperties;
  onChange: (properties: FlexboxProperties) => void;
}

export const ControlPanel = ({ properties, onChange }: ControlPanelProps) => {
  const updateProperty = <K extends keyof FlexboxProperties>(
    key: K,
    value: FlexboxProperties[K]
  ) => {
    onChange({ ...properties, [key]: value });
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold mb-4 text-foreground">Flexbox Controls</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Adjust these properties to see how flexbox behavior changes in real-time.
        </p>
      </div>

      {/* Display */}
      <div className="space-y-2">
        <Label htmlFor="display" className="text-sm font-medium">Display</Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="display"
            checked={properties.display === 'flex'}
            onCheckedChange={(checked) => updateProperty('display', checked ? 'flex' : 'block')}
          />
          <span className="text-sm text-muted-foreground">
            {properties.display === 'flex' ? 'flex' : 'block'}
          </span>
        </div>
      </div>

      {/* Flex Direction */}
      <div className="space-y-2">
        <Label htmlFor="flex-direction" className="text-sm font-medium">Flex Direction</Label>
        <Select 
          value={properties.flexDirection} 
          onValueChange={(value: FlexboxProperties['flexDirection']) => updateProperty('flexDirection', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="row">row</SelectItem>
            <SelectItem value="row-reverse">row-reverse</SelectItem>
            <SelectItem value="column">column</SelectItem>
            <SelectItem value="column-reverse">column-reverse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Flex Wrap */}
      <div className="space-y-2">
        <Label htmlFor="flex-wrap" className="text-sm font-medium">Flex Wrap</Label>
        <Select 
          value={properties.flexWrap} 
          onValueChange={(value: FlexboxProperties['flexWrap']) => updateProperty('flexWrap', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nowrap">nowrap</SelectItem>
            <SelectItem value="wrap">wrap</SelectItem>
            <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Justify Content */}
      <div className="space-y-2">
        <Label htmlFor="justify-content" className="text-sm font-medium">Justify Content</Label>
        <Select 
          value={properties.justifyContent} 
          onValueChange={(value: FlexboxProperties['justifyContent']) => updateProperty('justifyContent', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">flex-start</SelectItem>
            <SelectItem value="flex-end">flex-end</SelectItem>
            <SelectItem value="center">center</SelectItem>
            <SelectItem value="space-between">space-between</SelectItem>
            <SelectItem value="space-around">space-around</SelectItem>
            <SelectItem value="space-evenly">space-evenly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Align Items */}
      <div className="space-y-2">
        <Label htmlFor="align-items" className="text-sm font-medium">Align Items</Label>
        <Select 
          value={properties.alignItems} 
          onValueChange={(value: FlexboxProperties['alignItems']) => updateProperty('alignItems', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">flex-start</SelectItem>
            <SelectItem value="flex-end">flex-end</SelectItem>
            <SelectItem value="center">center</SelectItem>
            <SelectItem value="baseline">baseline</SelectItem>
            <SelectItem value="stretch">stretch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Align Content */}
      <div className="space-y-2">
        <Label htmlFor="align-content" className="text-sm font-medium">Align Content</Label>
        <Select 
          value={properties.alignContent} 
          onValueChange={(value: FlexboxProperties['alignContent']) => updateProperty('alignContent', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">flex-start</SelectItem>
            <SelectItem value="flex-end">flex-end</SelectItem>
            <SelectItem value="center">center</SelectItem>
            <SelectItem value="space-between">space-between</SelectItem>
            <SelectItem value="space-around">space-around</SelectItem>
            <SelectItem value="stretch">stretch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gap */}
      <div className="space-y-3">
        <Label htmlFor="gap" className="text-sm font-medium">Gap: {properties.gap}px</Label>
        <Slider
          id="gap"
          min={0}
          max={50}
          step={1}
          value={[properties.gap]}
          onValueChange={([value]) => updateProperty('gap', value)}
          className="w-full"
        />
      </div>
    </div>
  );
};