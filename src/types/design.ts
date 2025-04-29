
import { Canvas } from 'fabric';

export type DesignType = 'social' | 'banner' | 'poster' | 'card';
export type DesignTone = 'professional' | 'playful' | 'elegant' | 'bold' | 'minimal';
export type TextAlignment = 'left' | 'center' | 'right';

export interface DesignFormData {
  type: DesignType;
  tone: DesignTone;
  text: string;
  emphasis?: string;
  logo?: File | string;
}

export interface DesignElementBase {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  locked: boolean;
}

export interface TextElement extends DesignElementBase {
  type: 'text';
  content: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  textAlign: TextAlignment;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface ShapeElement extends DesignElementBase {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle';
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
}

export interface ImageElement extends DesignElementBase {
  type: 'image';
  src: string;
  objectFit: 'cover' | 'contain';
}

export type DesignElement = TextElement | ShapeElement | ImageElement;

export interface DesignCanvas {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  elements: DesignElement[];
  created: Date;
  lastModified: Date;
}

export interface DesignProject {
  id: string;
  name: string;
  description: string;
  canvases: DesignCanvas[];
  created: Date;
  lastModified: Date;
}

// These interfaces help with Fabric.js typings
export interface CanvasObject extends fabric.Object {
  id: string;
  type: string;
  toObject(): any;
}

// Export options for Fabric.js canvas
export interface TDataUrlOptions {
  format?: string;
  quality?: number;
  multiplier: number;
  enableRetinaScaling?: boolean;
}
