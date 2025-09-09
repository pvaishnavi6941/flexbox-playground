import { useState } from 'react';
import { ControlPanel } from './ControlPanel';

export interface FlexboxProperties {
  display: 'flex' | 'block';
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  gap: number;
}

const initialProperties: FlexboxProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  gap: 10,
};

export const FlexboxPlayground = () => {
  const [properties, setProperties] = useState<FlexboxProperties>(initialProperties);

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
    <div className="flex min-h-screen bg-gradient-bg">
      {/* Control Panel */}
      <div className="w-80 bg-control-panel border-r border-border shadow-lg">
        <ControlPanel 
          properties={properties} 
          onChange={setProperties}
        />
      </div>

      {/* Main Playground Area */}
      <div className="flex-1 p-8">
        <div className="h-full bg-playground-bg rounded-lg p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Flexbox Container</h2>
            <p className="text-white/80">Adjust the properties to see how flexbox works</p>
          </div>
          
          {/* Flex Container */}
          <div 
            className="bg-playground-container rounded-lg p-6 min-h-[400px] shadow-lg border-2 border-white/20"
            style={containerStyle}
          >
            {/* Flex Items */}
            <div className="bg-playground-item1 rounded-lg p-4 min-w-[80px] min-h-[80px] flex items-center justify-center text-white font-bold text-xl shadow-md">
              1
            </div>
            <div className="bg-playground-item2 rounded-lg p-4 min-w-[80px] min-h-[80px] flex items-center justify-center text-white font-bold text-xl shadow-md">
              2
            </div>
            <div className="bg-playground-item3 rounded-lg p-4 min-w-[80px] min-h-[80px] flex items-center justify-center text-white font-bold text-xl shadow-md">
              3
            </div>
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
    </div>
  );
};