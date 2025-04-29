
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import DesignNavbar from '@/components/DesignNavbar';
import DesignFooter from '@/components/DesignFooter';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DesignNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Transform Text into{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-design-gradient-start to-design-gradient-end">
                  Professional Designs
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Create stunning graphics from your text in seconds with our AI-powered design automation tool.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create">
                  <Button size="lg" className="gap-2">
                    Start Creating <MoveRight size={18} />
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button variant="outline" size="lg">
                    Explore Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform simplifies the design process from text input to finished graphic
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Input Your Text</h3>
                <p className="text-muted-foreground">
                  Enter your text content and select design preferences like tone and style
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Generates Design</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your text and creates professional design options based on your preferences
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customize & Export</h3>
                <p className="text-muted-foreground">
                  Fine-tune your design with our intuitive editor and export in multiple formats
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Create Any Type of Design</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Perfect for social media posts, marketing materials, presentations and more
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-gradient-to-br from-design-purple to-design-pink rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Social Posts</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-design-blue to-design-purple rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Posters</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-design-green to-design-blue rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Banners</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-design-orange to-design-pink rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Presentations</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-design-pink to-design-purple rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Business Cards</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-design-purple to-design-blue rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Flyers</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-design-blue to-design-green rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Logos</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-design-pink to-design-orange rounded-lg p-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Infographics</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-design-gradient-start to-design-gradient-end">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to create amazing designs?</h2>
              <p className="text-lg mb-8 text-white/80">
                Join thousands of users who are creating professional designs with our AI-powered platform.
              </p>
              <Link to="/create">
                <Button size="lg" variant="secondary" className="gap-2">
                  Start Creating Now <MoveRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <DesignFooter />
    </div>
  );
};

export default Index;
