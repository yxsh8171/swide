
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DesignNavbar from '@/components/DesignNavbar';
import DesignFooter from '@/components/DesignFooter';
import { DesignFormData, DesignType, DesignTone } from '@/types/design';

const designSchema = z.object({
  type: z.enum(['poster', 'banner', 'social', 'card', 'custom']),
  tone: z.enum(['professional', 'playful', 'elegant', 'bold', 'minimal']),
  text: z.string().min(5, 'Text must be at least 5 characters').max(500, 'Text cannot exceed 500 characters'),
  emphasis: z.string().max(100, 'Emphasis text cannot exceed 100 characters'),
});

const CreateDesign = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof designSchema>>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      type: 'social',
      tone: 'professional',
      text: '',
      emphasis: '',
    },
  });

  const onSubmit = (values: z.infer<typeof designSchema>) => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      console.log('Design values:', values, 'Logo:', logoFile);
      
      // In a real implementation, this would call an API to generate the design
      // For now, we'll simulate success and navigate to the editor
      toast.success('Design generated successfully!');
      setIsGenerating(false);
      
      // Store design data in localStorage for the editor to use
      const designData = {
        ...values,
        logo: logoFile ? URL.createObjectURL(logoFile) : null,
      };
      localStorage.setItem('currentDesign', JSON.stringify(designData));
      
      // Navigate to the editor
      navigate('/editor');
    }, 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      toast.info('Logo uploaded. It will be incorporated into your design.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DesignNavbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Create Your Design</h1>
            <p className="text-muted-foreground mt-2">
              Provide text and preferences to generate your custom design
            </p>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Design Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select design type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="poster">Poster</SelectItem>
                            <SelectItem value="banner">Banner</SelectItem>
                            <SelectItem value="social">Social Media Post</SelectItem>
                            <SelectItem value="card">Business Card</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the type of design you want to create
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Design Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select design tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="playful">Playful</SelectItem>
                            <SelectItem value="elegant">Elegant</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the tone that best fits your message
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Text Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the main text for your design..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This text will be analyzed by AI to generate your design
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emphasis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Emphasis (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What text should be emphasized?"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Words or phrases you want to highlight in the design
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>Logo (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a logo to include in your design (PNG or JPG)
                  </FormDescription>
                </FormItem>
                
                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? 'Generating Design...' : 'Generate Design'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <DesignFooter />
    </div>
  );
};

export default CreateDesign;
