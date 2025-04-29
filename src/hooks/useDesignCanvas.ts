import { useRef, useState, useEffect } from 'react';
import { Canvas, Textbox, Circle, Rect, Triangle, Image as FabricImage } from 'fabric';
import { DesignFormData, TextAlignment } from '@/types/design';
import { toast } from 'sonner';

export interface TextOptions {
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  textAlign: TextAlignment;
  bold: boolean;
  italic: boolean;
}

export const useDesignCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<any | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [textOptions, setTextOptions] = useState<TextOptions>({
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#000000',
    backgroundColor: 'transparent',
    textAlign: 'center',
    bold: false,
    italic: false,
  });

  // Initialize fabric canvas
  useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      const canvas = new Canvas(canvasRef.current, {
        width: canvasSize.width,
        height: canvasSize.height,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
      });

      fabricRef.current = canvas;
      
      // Handle selection change events
      canvas.on('selection:created', handleSelectionChange);
      canvas.on('selection:updated', handleSelectionChange);
      canvas.on('selection:cleared', () => setSelectedElement(null));
      
      // Load design data from localStorage
      const savedDesign = localStorage.getItem('currentDesign');
      if (savedDesign) {
        try {
          const parsedData = JSON.parse(savedDesign) as DesignFormData;
          generateDesignFromData(parsedData, canvas);
        } catch (error) {
          console.error("Error loading design data:", error);
          toast.error("Couldn't load your design data.");
        }
      } else {
        // Create a simple default design
        createDefaultDesign(canvas);
      }

      return () => {
        canvas.dispose();
        fabricRef.current = null;
      };
    }
  }, []);

  // Handle selection change
  const handleSelectionChange = (e: any) => {
    const selectedObject = fabricRef.current?.getActiveObject();
    if (selectedObject) {
      setSelectedElement(selectedObject);
      
      // Update text options if text object is selected
      if (selectedObject instanceof Textbox) {
        const textbox = selectedObject as Textbox;
        setTextOptions({
          fontSize: textbox.fontSize || 24,
          fontFamily: textbox.fontFamily || 'Arial',
          color: textbox.fill?.toString() || '#000000',
          backgroundColor: textbox.backgroundColor || 'transparent',
          textAlign: (textbox.textAlign as TextAlignment) || 'center',
          bold: textbox.fontWeight === 'bold',
          italic: textbox.fontStyle === 'italic',
        });
      }
    }
  };

  // Generate design based on input data
  const generateDesignFromData = (data: DesignFormData, canvas: Canvas) => {
    // Set canvas size based on design type
    let width = 1080;
    let height = 1080;
    
    switch (data.type) {
      case 'banner':
        width = 1200;
        height = 300;
        break;
      case 'social':
        width = 1080;
        height = 1080;
        break;
      case 'poster':
        width = 800;
        height = 1200;
        break;
      case 'card':
        width = 1050;
        height = 600;
        break;
    }
    
    setCanvasSize({ width, height });
    canvas.setWidth(width);
    canvas.setHeight(height);
    
    // Set background color based on tone
    let bgColor = '#ffffff';
    switch (data.tone) {
      case 'professional':
        bgColor = '#f8f9fa';
        break;
      case 'playful':
        bgColor = '#f0f9ff';
        break;
      case 'elegant':
        bgColor = '#f8f5ff';
        break;
      case 'bold':
        bgColor = '#1a1a1a';
        break;
      case 'minimal':
        bgColor = '#ffffff';
        break;
    }
    canvas.backgroundColor = bgColor;
    canvas.renderAll();
    
    // Generate text elements
    let textColor = data.tone === 'bold' ? '#ffffff' : '#1a1a1a';
    let accentColor = '';
    
    switch (data.tone) {
      case 'professional':
        accentColor = '#3b82f6';
        break;
      case 'playful':
        accentColor = '#8b5cf6';
        break;
      case 'elegant':
        accentColor = '#6366f1';
        break;
      case 'bold':
        accentColor = '#f43f5e';
        break;
      case 'minimal':
        accentColor = '#64748b';
        break;
    }
    
    // Create main text
    if (data.text) {
      const mainText = new Textbox(data.text, {
        left: width / 2,
        top: height / 2,
        originX: 'center',
        originY: 'center',
        width: width * 0.8,
        fontSize: data.type === 'card' ? 18 : 32,
        fontFamily: 'Arial',
        fill: textColor,
        textAlign: 'center',
        lineHeight: 1.3,
      });
      canvas.add(mainText);
    }
    
    // Create emphasis/headline text if provided
    if (data.emphasis) {
      const emphasisText = new Textbox(data.emphasis, {
        left: width / 2,
        top: height / 3,
        originX: 'center',
        originY: 'center',
        width: width * 0.8,
        fontSize: data.type === 'card' ? 24 : 48,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: accentColor,
        textAlign: 'center',
      });
      canvas.add(emphasisText);
    }
    
    // Add logo if provided
    if (data.logo) {
      const logoUrl = data.logo as unknown as string;
      
      const img = new Image();
      img.src = logoUrl;
      img.onload = () => {
        const fabricImage = new FabricImage(img, {
          left: width * 0.85,
          top: height * 0.15,
          originX: 'center',
          originY: 'center',
        });
        
        // Scale logo to appropriate size
        const maxSize = Math.min(width, height) * 0.2;
        if (fabricImage.width && fabricImage.height) {
          const scale = Math.min(maxSize / fabricImage.width, maxSize / fabricImage.height);
          fabricImage.scale(scale);
        }
        
        canvas.add(fabricImage);
        canvas.renderAll();
      };
    }
    
    // Add decorative elements based on tone
    addDecorativeElements(canvas, data.tone, width, height);
    
    canvas.renderAll();
    toast.success('Design generated! You can now edit the elements.');
  };

  // Add decorative elements based on design tone
  const addDecorativeElements = (canvas: Canvas, tone: string, width: number, height: number) => {
    switch (tone) {
      case 'professional':
        // Add a subtle line or shape
        const professionalLine = new Rect({
          left: width / 2,
          top: height * 0.8,
          originX: 'center',
          originY: 'center',
          width: width * 0.5,
          height: 3,
          fill: '#3b82f6',
        });
        canvas.add(professionalLine);
        break;
        
      case 'playful':
        // Add some playful circles
        for (let i = 0; i < 5; i++) {
          const circle = new Circle({
            left: Math.random() * width,
            top: Math.random() * height,
            radius: 15 + Math.random() * 30,
            fill: `rgba(139, 92, 246, ${0.1 + Math.random() * 0.2})`,
            selectable: true,
          });
          canvas.add(circle);
        }
        break;
        
      case 'elegant':
        // Add an elegant decorative element
        const elegantRect = new Rect({
          left: width / 2,
          top: height * 0.2,
          originX: 'center',
          originY: 'center',
          width: width * 0.6,
          height: 1,
          fill: '#6366f1',
        });
        canvas.add(elegantRect);
        
        const elegantRect2 = new Rect({
          left: width / 2,
          top: height * 0.75,
          originX: 'center',
          originY: 'center',
          width: width * 0.6,
          height: 1,
          fill: '#6366f1',
        });
        canvas.add(elegantRect2);
        break;
        
      case 'bold':
        // Add a bold graphic element
        const boldRect = new Rect({
          left: 0,
          top: 0,
          width: width * 0.3,
          height: height,
          fill: '#f43f5e',
        });
        canvas.add(boldRect);
        
        // Send rectangle to back
        canvas.sendObjectToBack(boldRect);
        break;
        
      case 'minimal':
        // Just add a subtle element
        const minimalCircle = new Circle({
          left: width * 0.1,
          top: height * 0.1,
          radius: 20,
          fill: '#e2e8f0',
          selectable: true,
        });
        canvas.add(minimalCircle);
        break;
    }
  };

  // Create a default design if no data is provided
  const createDefaultDesign = (canvas: Canvas) => {
    // Set default canvas size
    const width = 1080;
    const height = 1080;
    setCanvasSize({ width, height });
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
    
    // Add a welcome text
    const welcomeText = new Textbox('Welcome to SwiftDesignForge', {
      left: width / 2,
      top: height / 3,
      originX: 'center',
      originY: 'center',
      width: width * 0.8,
      fontSize: 40,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#3b82f6',
      textAlign: 'center',
    });
    canvas.add(welcomeText);
    
    // Add a subtitle
    const subtitleText = new Textbox('Create stunning designs from your text with AI', {
      left: width / 2,
      top: height / 2,
      originX: 'center',
      originY: 'center',
      width: width * 0.7,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#64748b',
      textAlign: 'center',
      lineHeight: 1.3,
    });
    canvas.add(subtitleText);
    
    // Add instruction
    const instructionText = new Textbox('Click on any element to edit it, or add new elements using the toolbar', {
      left: width / 2,
      top: height * 0.7,
      originX: 'center',
      originY: 'center',
      width: width * 0.6,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: '#94a3b8',
      textAlign: 'center',
      lineHeight: 1.3,
    });
    canvas.add(instructionText);
    
    canvas.renderAll();
  };

  // Add new text element
  const addNewText = () => {
    if (!fabricRef.current) return;
    
    const text = new Textbox('Double-click to edit', {
      left: canvasSize.width / 2,
      top: canvasSize.height / 2,
      originX: 'center',
      originY: 'center',
      width: 300,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000',
      textAlign: 'center',
    });
    
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    fabricRef.current.renderAll();
    setSelectedElement(text);
  };

  // Add shape to canvas
  const addShape = (type: 'circle' | 'rectangle' | 'triangle') => {
    if (!fabricRef.current) return;
    
    let shape;
    
    switch (type) {
      case 'circle':
        shape = new Circle({
          left: canvasSize.width / 2,
          top: canvasSize.height / 2,
          originX: 'center',
          originY: 'center',
          radius: 50,
          fill: '#3b82f6',
        });
        break;
      case 'rectangle':
        shape = new Rect({
          left: canvasSize.width / 2,
          top: canvasSize.height / 2,
          originX: 'center',
          originY: 'center',
          width: 100,
          height: 100,
          fill: '#8b5cf6',
        });
        break;
      case 'triangle':
        shape = new Triangle({
          left: canvasSize.width / 2,
          top: canvasSize.height / 2,
          originX: 'center',
          originY: 'center',
          width: 100,
          height: 100,
          fill: '#f43f5e',
        });
        break;
    }
    
    if (shape) {
      fabricRef.current.add(shape);
      fabricRef.current.setActiveObject(shape);
      fabricRef.current.renderAll();
      setSelectedElement(shape);
    }
  };

  // Update text properties
  const updateTextProperty = (property: string, value: any) => {
    if (!selectedElement || !fabricRef.current) return;
    
    switch (property) {
      case 'fontSize':
        selectedElement.set('fontSize', value);
        break;
      case 'fontFamily':
        selectedElement.set('fontFamily', value);
        break;
      case 'color':
        selectedElement.set('fill', value);
        break;
      case 'backgroundColor':
        selectedElement.set('backgroundColor', value === 'transparent' ? '' : value);
        break;
      case 'textAlign':
        selectedElement.set('textAlign', value);
        break;
      case 'bold':
        selectedElement.set('fontWeight', value ? 'bold' : 'normal');
        break;
      case 'italic':
        selectedElement.set('fontStyle', value ? 'italic' : 'normal');
        break;
    }
    
    fabricRef.current.renderAll();
  };

  // Delete selected element
  const deleteSelectedElement = () => {
    if (!selectedElement || !fabricRef.current) return;
    
    fabricRef.current.remove(selectedElement);
    fabricRef.current.renderAll();
    setSelectedElement(null);
  };

  // Add image to canvas
  const addImageFromFile = (file: File) => {
    if (!fabricRef.current) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && fabricRef.current) {
        const imgElement = new Image();
        imgElement.src = event.target.result as string;
        
        imgElement.onload = () => {
          const fabricImage = new FabricImage(imgElement, {
            left: canvasSize.width / 2,
            top: canvasSize.height / 2,
            originX: 'center',
            originY: 'center',
          });
          
          // Scale image to fit in canvas
          const maxSize = Math.min(canvasSize.width, canvasSize.height) * 0.5;
          if (fabricImage.width && fabricImage.height) {
            const scale = Math.min(maxSize / fabricImage.width, maxSize / fabricImage.height);
            fabricImage.scale(scale);
          }
          
          fabricRef.current?.add(fabricImage);
          fabricRef.current?.setActiveObject(fabricImage);
          fabricRef.current?.renderAll();
          setSelectedElement(fabricImage);
        };
      }
    };
    reader.readAsDataURL(file);
  };

  // Export canvas as image
  const exportDesign = (format: 'png' | 'jpeg') => {
    if (!fabricRef.current) return;
    
    const dataUrl = fabricRef.current.toDataURL({
      format: format,
      quality: 0.8,
      multiplier: 1,
    });
    
    const link = document.createElement('a');
    link.download = `design-${new Date().getTime()}.${format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Design exported as ${format.toUpperCase()}`);
  };

  return {
    canvasRef,
    fabricRef,
    canvasSize,
    selectedElement,
    textOptions,
    setTextOptions,
    addNewText,
    addShape,
    updateTextProperty,
    deleteSelectedElement,
    addImageFromFile,
    exportDesign,
  };
};
