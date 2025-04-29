
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const DesignNavbar = () => {
  return (
    <header className="py-3 px-4 border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-design-gradient-start to-design-gradient-end">
            SwiftDesignForge
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link to="/templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <Link to="/create">
            <Button size="sm" className="gap-1">
              Create Design <MoveRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DesignNavbar;
