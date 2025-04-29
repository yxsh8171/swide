
import React from 'react';
import { Link } from "react-router-dom";

const DesignFooter = () => {
  return (
    <footer className="py-6 px-4 border-t mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-design-gradient-start to-design-gradient-end mb-2">
              SwiftDesignForge
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered design automation tool that transforms text into professional graphic designs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} SwiftDesignForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DesignFooter;
