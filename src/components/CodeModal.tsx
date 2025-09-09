import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { FlexboxProperties, LayoutItem } from '@/types/layout';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: FlexboxProperties;
  items: LayoutItem[];
  layoutName: string;
}

export const CodeModal = ({ isOpen, onClose, properties, items, layoutName }: CodeModalProps) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const generateTailwindClasses = (): string => {
    const classes = ['flex'];
    
    if (properties.flexDirection !== 'row') {
      classes.push(`flex-${properties.flexDirection}`);
    }
    
    if (properties.flexWrap !== 'nowrap') {
      classes.push(`flex-${properties.flexWrap}`);
    }

    const justifyMap = {
      'flex-start': 'justify-start',
      'flex-end': 'justify-end',
      'center': 'justify-center',
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly',
    };
    classes.push(justifyMap[properties.justifyContent]);

    const alignMap = {
      'flex-start': 'items-start',
      'flex-end': 'items-end',
      'center': 'items-center',
      'baseline': 'items-baseline',
      'stretch': 'items-stretch',
    };
    classes.push(alignMap[properties.alignItems]);

    if (properties.gap > 0) {
      classes.push(`gap-${Math.round(properties.gap / 4)}`);
    }

    return classes.join(' ');
  };

  const generateHTML = (): string => {
    const tailwindClasses = generateTailwindClasses();
    return `<div class="${tailwindClasses} p-6 min-h-[400px] bg-gray-100 rounded-lg">
${items.map((item, index) => `  <div class="bg-blue-500 text-white rounded-lg p-4 min-w-[80px] min-h-[80px] flex items-center justify-center font-bold text-xl">
    ${item.label}
  </div>`).join('\n')}
</div>`;
  };

  const generateCSS = (): string => {
    return `.flexbox-container {
  display: ${properties.display};
  flex-direction: ${properties.flexDirection};
  flex-wrap: ${properties.flexWrap};
  justify-content: ${properties.justifyContent};
  align-items: ${properties.alignItems};
  align-content: ${properties.alignContent};
  gap: ${properties.gap}px;
  padding: 24px;
  min-height: 400px;
  background-color: #f3f4f6;
  border-radius: 8px;
}

.flexbox-item {
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  padding: 16px;
  min-width: 80px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
}`;
  };

  const generateReactJSX = (): string => {
    return `// ${layoutName} Layout Component
export const FlexboxLayout = () => {
  return (
    <div className="${generateTailwindClasses()} p-6 min-h-[400px] bg-gray-100 rounded-lg">
${items.map((item, index) => `      <div className="bg-blue-500 text-white rounded-lg p-4 min-w-[80px] min-h-[80px] flex items-center justify-center font-bold text-xl">
        ${item.label}
      </div>`).join('\n')}
    </div>
  );
};`;
  };

  const copyToClipboard = async (text: string, tabId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(tabId);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Export Code - {layoutName}
            <Badge variant="secondary">{items.length} items</Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="html" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="html">HTML + Tailwind</TabsTrigger>
            <TabsTrigger value="css">HTML + CSS</TabsTrigger>
            <TabsTrigger value="react">React JSX</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">HTML with Tailwind CSS</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(generateHTML(), 'html')}
              >
                {copiedTab === 'html' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedTab === 'html' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto flex-1 font-mono">
              <code>{generateHTML()}</code>
            </pre>
          </TabsContent>

          <TabsContent value="css" className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">HTML with CSS</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(generateCSS(), 'css')}
              >
                {copiedTab === 'css' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedTab === 'css' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto flex-1 font-mono">
              <code>{generateCSS()}</code>
            </pre>
          </TabsContent>

          <TabsContent value="react" className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">React JSX Component</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(generateReactJSX(), 'react')}
              >
                {copiedTab === 'react' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedTab === 'react' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto flex-1 font-mono">
              <code>{generateReactJSX()}</code>
            </pre>
          </TabsContent>

          <TabsContent value="properties" className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">CSS Properties</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(Object.entries(properties).map(([key, value]) => `${key}: ${value}`).join('\n'), 'properties')}
              >
                {copiedTab === 'properties' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedTab === 'properties' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg text-sm overflow-auto flex-1">
              <div className="space-y-2">
                {Object.entries(properties).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-mono text-primary">{key}:</span>
                    <span className="font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};