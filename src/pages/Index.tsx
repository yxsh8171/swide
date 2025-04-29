
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight } from 'lucide-react';
import ModernNavbar from '@/components/ModernNavbar';
import ModernFooter from '@/components/ModernFooter';

// FAQ Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const Index = () => {
  const faqs = [
    {
      question: "What services does XALEY offer?",
      answer: "We offer a comprehensive range of design and development services including UI/UX design, web development, mobile app development, graphic design, and branding solutions."
    },
    {
      question: "How much does it cost to work with your agency?",
      answer: "Our pricing varies depending on project scope and requirements. We offer customized solutions tailored to meet your specific needs and budget."
    },
    {
      question: "How long does it take to complete a design project?",
      answer: "Project timelines depend on complexity and scope. Typically, small projects take 2-4 weeks, while larger projects may require 2-3 months or more."
    },
    {
      question: "Does XALEY provide design services for mobile apps?",
      answer: "Yes, we specialize in creating modern and user-friendly mobile app designs for both iOS and Android platforms."
    },
    {
      question: "How many design revisions do I get with each project?",
      answer: "We believe in getting your design right. Our process includes up to three rounds of revisions to ensure your complete satisfaction."
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ModernNavbar />
      
      <main className="flex-grow">
        {/* Hero Section with purple glow effect */}
        <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Crafting<br />
                narrative<br />
                through<br />
                <span className="text-gray-400">design</span>
              </h1>
              
              <div className="flex space-x-1 my-6">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex flex-wrap mt-12">
              <div className="w-full md:w-1/3 pr-8">
                <p className="text-sm uppercase text-white/60">OUR CAPABILITIES</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <img src="/placeholder.svg" alt="Design capability" className="bg-secondary/50 aspect-square object-cover" />
                  <img src="/placeholder.svg" alt="Development capability" className="bg-secondary/50 aspect-square object-cover" />
                  <img src="/placeholder.svg" alt="Branding capability" className="bg-secondary/50 aspect-square object-cover" />
                </div>
              </div>
              <div className="w-full md:w-2/3 mt-8 md:mt-0 flex justify-end items-end">
                <a href="#scroll-down" className="flex items-center gap-2 text-white/60 hover:text-white">
                  <span>SCROLL DOWN</span>
                  <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                    <ArrowRight size={16} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section id="scroll-down" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold mb-8">
                  At XALEY, we believe<br />
                  that design is not just<br />
                  about appearance but<br />
                  also <span className="text-gray-400">about creating</span><br />
                  immersive and <span className="inline-flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full self-center"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full self-center"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full self-center"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full self-center"></div>
                  </span><br />
                  meaningful <span className="text-gray-400">experiences.</span>
                </h2>
              </div>
              <div className="w-full md:w-1/2 md:pl-16 flex flex-col justify-between">
                <div>
                  <p className="text-sm uppercase text-white/60 mb-2">ABOUT US</p>
                  <p className="text-lg mb-8">
                    We are a creative design agency focused on creating impactful digital experiences
                    that tell your brand's story. Our team of designers and developers work together to
                    craft solutions that are both beautiful and functional.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase text-white/60 mb-2">LEARN MORE</p>
                  <Link to="/about" className="flex items-center gap-2 text-white hover:underline">
                    <span>About Our Approach</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Projects */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm uppercase text-white/60 mb-4">FEATURED WORK</p>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="aspect-[16/7] bg-secondary/50 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Featured project" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square bg-secondary/50 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Portfolio item" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square bg-secondary/50 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Portfolio item" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="service-item">
                <div className="w-16 h-16 bg-secondary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src="/placeholder.svg" alt="Mobile App Design" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Mobile App<br />Design</h3>
                  <p className="text-white/60 text-sm">
                    User-focused interfaces that drive engagement and deliver exceptional experiences across all devices.
                  </p>
                </div>
              </div>
              
              <div className="service-item">
                <div className="w-16 h-16 bg-secondary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src="/placeholder.svg" alt="Website Design" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Website<br />Design</h3>
                  <p className="text-white/60 text-sm">
                    Responsive websites that combine stunning visuals with intuitive navigation and compelling content.
                  </p>
                </div>
              </div>
              
              <div className="service-item">
                <div className="w-16 h-16 bg-secondary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src="/placeholder.svg" alt="Development" className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Development</h3>
                  <p className="text-white/60 text-sm">
                    Clean, efficient code that brings designs to life with responsive layouts and optimized performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Project */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-purple-900/30 rounded-lg p-6 sm:p-10">
              <div className="flex items-baseline mb-2">
                <p className="text-sm text-purple-300 mr-2">Horigo style</p>
                <h3 className="text-xl font-semibold">Lordsleep App</h3>
                <span className="text-xs text-white/40 ml-2 self-center">v1.4</span>
              </div>
              <p className="text-white/60 mb-6">Dettingford Heligan</p>
              
              <div className="aspect-[16/9] overflow-hidden rounded-md">
                <img 
                  src="/lovable-uploads/590b14b0-3efa-43a8-8324-8c6e9d34fbdb.png" 
                  alt="Featured project" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12">
              <h2 className="text-3xl font-bold mb-6 md:mb-0">
                Frequently<br />
                asked<br />
                questions
              </h2>
              
              <div className="max-w-lg">
                <p className="text-white/60">
                  Find answers to common questions about our design process, project timelines, pricing, and more.
                  If you can't find what you're looking for, feel free to contact us directly.
                </p>
              </div>
            </div>
            
            <div className="max-w-3xl">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default Index;
