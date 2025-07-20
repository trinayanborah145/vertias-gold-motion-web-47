import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, Users, Target, TrendingUp, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  const fullText = 'Vertias Media';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check if stats section is visible and hasn't been animated yet
      if (!statsVisible) {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          const rect = aboutSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Trigger when 50% of the about section is visible
          if (rect.top < windowHeight * 0.5 && rect.bottom > 0) {
            setStatsVisible(true);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsVisible]);

  // Typewriter effect for loading animation
  useEffect(() => {
    let currentIndex = 0;
    const typewriterTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterTimer);
        // Wait a bit after typing is complete, then hide loading
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 150); // Adjust speed of typing here

    return () => clearInterval(typewriterTimer);
  }, []);

  // Animate stats when visible - this only runs once when statsVisible becomes true
  useEffect(() => {
    if (statsVisible) {
      // Animate projects count
      let projectsStart = 0;
      const projectsEnd = 150;
      const projectsIncrement = projectsEnd / 60;
      const projectsTimer = setInterval(() => {
        projectsStart += projectsIncrement;
        if (projectsStart >= projectsEnd) {
          setProjectsCount(projectsEnd);
          clearInterval(projectsTimer);
        } else {
          setProjectsCount(Math.floor(projectsStart));
        }
      }, 16);

      // Animate clients count
      let clientsStart = 0;
      const clientsEnd = 50;
      const clientsIncrement = clientsEnd / 60;
      const clientsTimer = setInterval(() => {
        clientsStart += clientsIncrement;
        if (clientsStart >= clientsEnd) {
          setClientsCount(clientsEnd);
          clearInterval(clientsTimer);
        } else {
          setClientsCount(Math.floor(clientsStart));
        }
      }, 16);

      // Animate success rate
      let successStart = 0;
      const successEnd = 98;
      const successIncrement = successEnd / 60;
      const successTimer = setInterval(() => {
        successStart += successIncrement;
        if (successStart >= successEnd) {
          setSuccessRate(successEnd);
          clearInterval(successTimer);
        } else {
          setSuccessRate(Math.floor(successStart));
        }
      }, 16);

      return () => {
        clearInterval(projectsTimer);
        clearInterval(clientsTimer);
        clearInterval(successTimer);
      };
    }
  }, [statsVisible]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <h1 className="text-6xl md:text-8xl font-bold gradient-text">
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-gold/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-text">Vertias Media</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className="hover:text-gold transition-colors duration-300">Home</button>
                <button onClick={() => scrollToSection('services')} className="hover:text-gold transition-colors duration-300">Services</button>
                <button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors duration-300">About</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-gold transition-colors duration-300">Contact</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-gold transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('home')} className="block px-3 py-2 text-base font-medium hover:text-gold transition-colors duration-300">Home</button>
              <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-base font-medium hover:text-gold transition-colors duration-300">Services</button>
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-base font-medium hover:text-gold transition-colors duration-300">About</button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-base font-medium hover:text-gold transition-colors duration-300">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Elevate Your Brand with
            <span className="block gradient-text">Vertias Media</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-in-right">
            We craft compelling narratives and digital experiences that drive results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gold hover:bg-gold-600 text-black font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105 animate-glow"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('services')}
              className="border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" /> Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We deliver comprehensive marketing solutions that transform your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-12 w-12 text-gold" />,
                title: "Brand Strategy",
                description: "Comprehensive brand positioning and strategy development that resonates with your target audience."
              },
              {
                icon: <TrendingUp className="h-12 w-12 text-gold" />,
                title: "Digital Marketing",
                description: "Data-driven digital campaigns across all platforms to maximize your reach and ROI."
              },
              {
                icon: <Users className="h-12 w-12 text-gold" />,
                title: "Social Media",
                description: "Engaging social media strategies that build communities and drive meaningful conversations."
              },
              {
                icon: <Star className="h-12 w-12 text-gold" />,
                title: "Creative Production",
                description: "Award-winning creative content that captures attention and drives action."
              },
              {
                icon: <Target className="h-12 w-12 text-gold" />,
                title: "Performance Analytics",
                description: "In-depth analysis and reporting to optimize campaigns and measure success."
              },
              {
                icon: <TrendingUp className="h-12 w-12 text-gold" />,
                title: "Consulting",
                description: "Strategic marketing consulting to guide your business growth and market expansion."
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gold/20 hover-lift group cursor-pointer"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">Vertias Media</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                At Vertias Media, we believe in the power of authentic storytelling. Our team of creative professionals and strategic thinkers work together to build brands that matter.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                With over a decade of experience in the industry, we've helped businesses of all sizes achieve their marketing goals through innovative strategies and compelling creative execution.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2 transition-all duration-1000">
                    {projectsCount}+
                  </div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2 transition-all duration-1000">
                    {clientsCount}+
                  </div>
                  <div className="text-gray-300">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2 transition-all duration-1000">
                    {successRate}%
                  </div>
                  <div className="text-gray-300">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gold/20 to-transparent rounded-full absolute -top-10 -right-10 w-72 h-72 blur-3xl"></div>
              <div className="relative z-10 bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gold/20">
                <h3 className="text-2xl font-semibold mb-4 gradient-text">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To empower businesses with marketing strategies that drive real results. We combine creativity with data-driven insights to create campaigns that not only look great but perform exceptionally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to elevate your brand? Get in touch and let's create something amazing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-semibold mb-8">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">hello@vertiasmedia.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-gray-300">New York, NY</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-gold/20">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <Button className="w-full bg-gold hover:bg-gold-600 text-black font-semibold py-3 transition-all duration-300 hover:scale-105">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gold/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text mb-4">Vertias Media</h3>
            <p className="text-gray-400 mb-4">Crafting authentic stories that drive results</p>
            <p className="text-sm text-gray-500">© 2024 Vertias Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
