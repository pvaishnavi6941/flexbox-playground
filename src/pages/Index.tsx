import { FlexboxPlayground } from '@/components/FlexboxPlayground';
import { Button } from '@/components/ui/button';
import { Github, Grid3X3, Code } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Flexbox Labs</h1>
            <p className="text-sm text-muted-foreground">Interactive CSS Flexbox Playground</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Code className="h-4 w-4" />
              Get Code
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Grid3X3 className="h-4 w-4" />
              Grids beta
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Github className="h-4 w-4" />
              Star on GitHub
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <FlexboxPlayground />

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-border p-4">
        <div className="text-center text-sm text-muted-foreground">
          <span>Built with React & Tailwind CSS • </span>
          <a href="#" className="hover:text-primary transition-colors">Grids beta</a>
          <span> • </span>
          <a href="#" className="hover:text-primary transition-colors">Star on GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
