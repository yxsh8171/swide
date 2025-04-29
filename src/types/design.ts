
export type DesignType = 'poster' | 'banner' | 'social' | 'card' | 'custom';
export type DesignTone = 'professional' | 'playful' | 'elegant' | 'bold' | 'minimal';
export type TextAlignment = 'left' | 'center' | 'right';

export interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'background';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    textAlign?: TextAlignment;
    opacity?: number;
    borderRadius?: number;
    padding?: number;
    lineHeight?: number;
    letterSpacing?: number;
    [key: string]: any;
  };
  src?: string;
}

export interface DesignCanvas {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  elements: DesignElement[];
  type: DesignType;
  tone: DesignTone;
}

export interface DesignFormData {
  type: DesignType;
  tone: DesignTone;
  text: string;
  emphasis: string;
  logo?: File | null;
}

export interface DesignTemplate {
  id: string;
  name: string;
  type: DesignType;
  tone: DesignTone;
  thumbnail: string;
}

export interface AIDesignSuggestion {
  id: string;
  type: 'color' | 'font' | 'layout' | 'element';
  title: string;
  description: string;
  preview?: string;
  applyFunction: () => void;
}

// Updated type declarations for Fabric.js v6
declare module 'fabric' {
  export interface TextboxOptions {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    fill?: string | Record<string, unknown>; // For gradient or pattern
    backgroundColor?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  }
}
