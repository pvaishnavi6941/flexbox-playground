import { useState } from 'react';
import { LayoutGallery } from './LayoutGallery';
import { ItemControls } from './ItemControls';
import { CodeModal } from './CodeModal';
import { layoutPresets } from '@/data/layoutPresets';
import { FlexboxProperties, LayoutPreset, LayoutItem } from '@/types/layout';

export const FlexboxPlayground = () => {
  const [selectedPreset, setSelectedPreset] = useState<LayoutPreset>(layoutPresets[0]);
  const [properties, setProperties] = useState<FlexboxProperties>(layoutPresets[0].properties);
  const [items, setItems] = useState<LayoutItem[]>(
    Array.from({ length: layoutPresets[0].itemCount }, (_, i) => ({
      id: `item-${i + 1}`,
      label: String(i + 1),
    }))
  );
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const handlePresetSelect = (preset: LayoutPreset) => {
    setSelectedPreset(preset);
    setProperties(preset.properties);
    setItems(Array.from({ length: preset.itemCount }, (_, i) => ({
      id: `item-${i + 1}`,
      label: String(i + 1),
    })));
  };

  const handleAddItem = () => {
    const newItem: LayoutItem = {
      id: `item-${items.length + 1}`,
      label: String(items.length + 1),
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  const handleGetCode = () => {
    setIsCodeModalOpen(true);
  };

  const containerStyle: React.CSSProperties = {
    display: properties.display,
    flexDirection: properties.flexDirection,
    flexWrap: properties.flexWrap,
    justifyContent: properties.justifyContent,
    alignItems: properties.alignItems,
    alignContent: properties.alignContent,
    gap: `${properties.gap}px`,
  };

  return (
    <>
      <div className="flex min-h-screen bg-gradient-bg">
        {/* Layout Gallery */}
        <LayoutGallery
          presets={layoutPresets}
          selectedPreset={selectedPreset}
          onPresetSelect={handlePresetSelect}
        />

        {/* Main Playground Area */}
        <div className="flex-1 p-8">
          <div className="h-full bg-playground-bg rounded-lg p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedPreset.name} Layout
              </h2>
              <p className="text-white/80">{selectedPreset.description}</p>
            </div>
            
            {/* Flex Container */}
            <div 
              className="bg-playground-container rounded-lg p-6 min-h-[400px] shadow-lg border-2 border-white/20"
              style={containerStyle}
            >
              {/* Dynamic Flex Items */}
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className="rounded-lg p-4 min-w-[80px] min-h-[80px] flex items-center justify-center text-white font-bold text-xl shadow-md"
                  style={{
                    backgroundColor: `hsl(${220 + (index * 30) % 360}, 70%, ${50 + (index * 10) % 30}%)`,
                    ...(selectedPreset.name === 'Stretch Middle' && index === 1 ? { flex: 1 } : {}),
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Property Display */}
            <div className="mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-white font-semibold mb-2">Current CSS:</h3>
              <code className="text-white/90 text-sm">
                <div>display: {properties.display};</div>
                <div>flex-direction: {properties.flexDirection};</div>
                <div>flex-wrap: {properties.flexWrap};</div>
                <div>justify-content: {properties.justifyContent};</div>
                <div>align-items: {properties.alignItems};</div>
                <div>align-content: {properties.alignContent};</div>
                <div>gap: {properties.gap}px;</div>
              </code>
            </div>
          </div>
        </div>

        {/* Item Controls */}
        <ItemControls
          items={items}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onGetCode={handleGetCode}
        />
      </div>

      {/* Code Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        properties={properties}
        items={items}
        layoutName={selectedPreset.name}
      />
    </>
  );
};