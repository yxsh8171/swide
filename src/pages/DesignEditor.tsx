
import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import DesignNavbar from '@/components/DesignNavbar';
import { Canvas, Circle, Rect, Textbox, Triangle } from 'fabric';
import { DesignCanvas, DesignElement, DesignFormData } from '@/types/design';
import { MoveRight } from 'lucide-react';

// Fonts to choose from
const fontOptions = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
];

// Color presets
const colorPresets = [
  '#1a1a1a', '#ffffff', '#ff5252', '#3b82f6', 
  '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'
];

const DesignEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const [activeTab, setActiveTab] = useState('text');
  const [designData, setDesignData] = useState<DesignFormData | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [selectedElement, setSelectedElement] = useState<any | null>(null);
  const [textOptions, setTextOptions] = useState({
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#000000',
    backgroundColor: 'transparent',
    textAlign: 'center' as 'left' | 'center' | 'right',
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
          setDesignData(parsedData);
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
          textAlign: (textbox.textAlign as 'left' | 'center' | 'right') || 'center',
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
      // Fixed error: Type '(img: any) => void' has no properties in common with type 'LoadImageOptions'
      // We need to use the fromURL method correctly with options
      const img = new Image();
      img.src = logoUrl;
      img.onload = () => {
        const fabricImage = new Image(img, {
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
        // Fixed error: Property 'sendToBack' does not exist on type 'Canvas'
        // Use moveToBack instead which is the correct method in Fabric.js v6
        canvas.getObjects().forEach(obj => {
          if (obj === boldRect) {
            obj.moveTo(0); // Move to the back (index 0)
          }
        });
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
  const addShape = (type: string) => {
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

  // Export canvas as image
  const exportDesign = (format: 'png' | 'jpeg') => {
    if (!fabricRef.current) return;
    
    // Fixed error: Property 'multiplier' is missing in type '{ format: "png" | "jpeg"; quality: number; }'
    // Add the required multiplier property to the options object
    const dataUrl = fabricRef.current.toDataURL({
      format: format,
      quality: 0.8,
      multiplier: 1,  // Added the required multiplier property
    });
    
    const link = document.createElement('a');
    link.download = `design-${new Date().getTime()}.${format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Design exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <DesignNavbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - editing tools */}
        <div className="w-64 bg-card border-r p-4 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="shapes">Shapes</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4">
              <Button onClick={addNewText} size="sm" className="w-full">
                Add New Text
              </Button>
              
              {selectedElement && selectedElement instanceof Textbox && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Font Size</label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[textOptions.fontSize]}
                        min={8}
                        max={120}
                        step={1}
                        onValueChange={([value]) => {
                          setTextOptions({...textOptions, fontSize: value});
                          updateTextProperty('fontSize', value);
                        }}
                      />
                      <span className="text-sm w-8">{textOptions.fontSize}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Font Family</label>
                    <Select
                      value={textOptions.fontFamily}
                      onValueChange={(value) => {
                        setTextOptions({...textOptions, fontFamily: value});
                        updateTextProperty('fontFamily', value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorPresets.map(color => (
                        <button
                          key={color}
                          className="w-full aspect-square rounded-md border flex items-center justify-center"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setTextOptions({...textOptions, color});
                            updateTextProperty('color', color);
                          }}
                        />
                      ))}
                    </div>
                    <Input
                      type="color"
                      value={textOptions.color}
                      onChange={(e) => {
                        setTextOptions({...textOptions, color: e.target.value});
                        updateTextProperty('color', e.target.value);
                      }}
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['left', 'center', 'right'] as const).map(align => (
                        <Button
                          key={align}
                          variant={textOptions.textAlign === align ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setTextOptions({...textOptions, textAlign: align});
                            updateTextProperty('textAlign', align);
                          }}
                        >
                          {align.charAt(0).toUpperCase() + align.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={textOptions.bold ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setTextOptions({...textOptions, bold: !textOptions.bold});
                        updateTextProperty('bold', !textOptions.bold);
                      }}
                    >
                      Bold
                    </Button>
                    <Button
                      variant={textOptions.italic ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setTextOptions({...textOptions, italic: !textOptions.italic});
                        updateTextProperty('italic', !textOptions.italic);
                      }}
                    >
                      Italic
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="shapes" className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button onClick={() => addShape('rectangle')} size="sm" className="h-16">
                  Rectangle
                </Button>
                <Button onClick={() => addShape('circle')} size="sm" className="h-16">
                  Circle
                </Button>
                <Button onClick={() => addShape('triangle')} size="sm" className="h-16">
                  Triangle
                </Button>
              </div>
              
              {selectedElement && !(selectedElement instanceof Textbox) && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fill Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorPresets.map(color => (
                        <button
                          key={color}
                          className="w-full aspect-square rounded-md border flex items-center justify-center"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            selectedElement.set('fill', color);
                            fabricRef.current?.renderAll();
                          }}
                        />
                      ))}
                    </div>
                    <Input
                      type="color"
                      value={(selectedElement.fill as string) || '#000000'}
                      onChange={(e) => {
                        selectedElement.set('fill', e.target.value);
                        fabricRef.current?.renderAll();
                      }}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0] && fabricRef.current) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      
                      // Fixed error: Type '(img: any) => void' has no properties in common with type 'LoadImageOptions'
                      reader.onload = (event) => {
                        if (event.target?.result && fabricRef.current) {
                          const imgElement = new Image();
                          imgElement.src = event.target.result as string;
                          
                          imgElement.onload = () => {
                            const fabricImage = new Image(imgElement);
                            
                            // Scale image to fit in canvas
                            const maxSize = Math.min(canvasSize.width, canvasSize.height) * 0.5;
                            if (fabricImage.width && fabricImage.height) {
                              const scale = Math.min(maxSize / fabricImage.width, maxSize / fabricImage.height);
                              fabricImage.scale(scale);
                            }
                            
                            fabricImage.set({
                              left: canvasSize.width / 2,
                              top: canvasSize.height / 2,
                              originX: 'center',
                              originY: 'center',
                            });
                            
                            fabricRef.current.add(fabricImage);
                            fabricRef.current.setActiveObject(fabricImage);
                            fabricRef.current.renderAll();
                            setSelectedElement(fabricImage);
                          };
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="cursor-pointer"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Common actions */}
          {selectedElement && (
            <div className="mt-8 pt-4 border-t space-y-4">
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={deleteSelectedElement}
              >
                Delete Selected Element
              </Button>
            </div>
          )}
          
          {/* Export options */}
          <div className="mt-8 pt-4 border-t">
            <h3 className="font-medium mb-4">Export Design</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportDesign('png')}
                className="flex-1"
              >
                PNG
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportDesign('jpeg')}
                className="flex-1"
              >
                JPEG
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main canvas area */}
        <div className="flex-1 flex items-center justify-center bg-muted/30 p-8 overflow-auto">
          <div 
            className="canvas-container" 
            style={{ 
              width: `${canvasSize.width}px`, 
              height: `${canvasSize.height}px`,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            <canvas ref={canvasRef} className="border rounded-md" />
          </div>
        </div>
        
        {/* Right sidebar - AI suggestions */}
        <div className="w-64 bg-card border-l p-4 overflow-y-auto">
          <h3 className="font-medium mb-4">AI Design Suggestions</h3>
          
          <div className="space-y-4">
            <div className="rounded-md border bg-card p-3">
              <h4 className="font-medium text-sm mb-1">Color Palette</h4>
              <p className="text-sm text-muted-foreground mb-2">Try a professional blue scheme</p>
              <div className="flex gap-1 mb-2">
                {['#1e3a8a', '#3b82f6', '#93c5fd', '#dbeafe', '#f8fafc'].map(color => (
                  <div 
                    key={color} 
                    className="w-full h-6 rounded-sm" 
                    style={{ backgroundColor: color }} 
                  />
                ))}
              </div>
              <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
            </div>
            
            <div className="rounded-md border bg-card p-3">
              <h4 className="font-medium text-sm mb-1">Layout Improvement</h4>
              <p className="text-sm text-muted-foreground mb-2">Balance elements for better hierarchy</p>
              <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
            </div>
            
            <div className="rounded-md border bg-card p-3">
              <h4 className="font-medium text-sm mb-1">Font Pairing</h4>
              <p className="text-sm text-muted-foreground mb-2">Georgia & Verdana for contrast</p>
              <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
            </div>
            
            <div className="rounded-md border bg-card p-3">
              <h4 className="font-medium text-sm mb-1">Background Style</h4>
              <p className="text-sm text-muted-foreground mb-2">Add subtle gradient background</p>
              <Button size="sm" variant="outline" className="w-full text-xs">Apply</Button>
            </div>
          </div>
          
          <div className="mt-8">
            <Button className="w-full gap-2">
              Get More Suggestions <MoveRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
