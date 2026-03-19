'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Scissors, Shirt, MapPin, Clock, Award, Heart, 
  Instagram, Mail, Phone, MapPin as MapIcon, ImageOff, CheckCheck,
  ChevronRight, ArrowUpRight
} from 'lucide-react';

// --- Types ---
type Stat = { number: string; label: string; icon: string };
type Product = { name: string; description: string; price: string; image_url: string };
type Feature = { title: string; description: string; icon: string };
type Testimonial = { name: string; text: string; role: string };

// --- Data ---
const brand = {
  name: "Dessy Atelier",
  tagline: "Elevating African Elegance",
  description: "Dessy Atelier is a premier fashion house in Lagos, specializing in bespoke tailoring and contemporary African couture that blends traditional craftsmanship with modern silhouettes.",
  industry: "Fashion",
  region: "Nigeria"
};

const products: Product[] = [
  { name: "Signature Agbada Set", description: "Hand-embroidered traditional wear re-imagined for the modern man.", price: "₦85,000", image_url: "https://picsum.photos/seed/fashion2/800/1000" },
  { name: "Bespoke Evening Gown", description: "A masterpiece of silk and lace, tailored to your exact measurements.", price: "₦150,000", image_url: "https://picsum.photos/seed/fashion3/800/1000" },
  { name: "The Atelier Suit", description: "Sharp, contemporary tailoring designed for high-stakes impact.", price: "₦110,000", image_url: "https://picsum.photos/seed/fashion4/800/1000" },
  { name: "Contemporary Kaftan", description: "Effortless luxury for everyday wear, crafted from premium cotton.", price: "₦65,000", image_url: "https://picsum.photos/seed/fashion5/800/1000" }
];

const features: Feature[] = [
  { title: "Bespoke Tailoring", description: "Every stitch is placed with precision to ensure a perfect fit for your unique silhouette.", icon: "Scissors" },
  { title: "Premium Fabrics", description: "We source the finest materials from across the continent to deliver unmatched quality.", icon: "Shirt" },
  { title: "Lagos Craftsmanship", description: "Rooted in the heart of Lagos, bringing urban energy to classic African designs.", icon: "MapPin" }
];

const stats: Stat[] = [
  { number: "10+", label: "Years in Fashion", icon: "Clock" },
  { number: "500+", label: "Custom Pieces", icon: "Award" },
  { number: "100%", label: "Client Satisfaction", icon: "Heart" }
];

const testimonials: Testimonial[] = [
  { name: "Tunde Ogunleye", text: "The attention to detail at Dessy Atelier is unmatched in Lagos. My suit fits like a second skin.", role: "Creative Director" },
  { name: "Ify Okeke", text: "My wedding gown was a dream come true. The fabric quality and the fit were beyond my expectations.", role: "Entrepreneur" },
  { name: "Adebayo Balogun", text: "Authentic African style with a modern twist. The Agbada set I ordered turned heads all night.", role: "Public Figure" }
];

const IMAGES = {
  hero: "https://picsum.photos/seed/fashion1/1200/800",
  about: "https://picsum.photos/seed/fashion6/800/1000"
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-[#222] ${className}`}>
        <ImageOff size={24} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const IconComponent = ({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) => {
  switch (name) {
    case 'Scissors': return <Scissors size={size} className={className} />;
    case 'Shirt': return <Shirt size={size} className={className} />;
    case 'MapPin': return <MapPin size={size} className={className} />;
    case 'Clock': return <Clock size={size} className={className} />;
    case 'Award': return <Award size={size} className={className} />;
    case 'Heart': return <Heart size={size} className={className} />;
    default: return <Shirt size={size} className={className} />;
  }
};

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  // Section Refs
  const heroReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.2);
  const productsReveal = useScrollReveal(0.1);
  const aboutReveal = useScrollReveal(0.2);
  const testimonialReveal = useScrollReveal(0.1);
  const contactReveal = useScrollReveal(0.2);

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 
        ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center font-heading text-xl font-black text-primary">
              D
            </div>
            <span className="font-heading text-xl font-bold tracking-tighter text-accent uppercase">
              Dessy<span className="text-secondary ml-1">Atelier</span>
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Collection', 'Atelier', 'Story', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium tracking-widest text-accent/70 hover:text-secondary transition-colors uppercase">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-primary px-6 py-2.5 font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all">
              Secure Look
            </a>
          </div>

          <button className="md:hidden text-accent" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button className="self-end text-accent mb-12" onClick={() => setMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Collection', 'Atelier', 'Story', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-3xl font-heading font-bold text-accent">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-secondary font-bold uppercase tracking-widest text-xs mb-4">Visit Us</p>
            <p className="text-accent/50 text-sm leading-relaxed">Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      {/* Hero Section (HR-A) */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center bg-primary px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-accent leading-[0.85] tracking-tight uppercase">
            Couture <br /> <span className="text-secondary">Crafted</span>
          </h1>
          <p className="text-accent/50 mt-10 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
            {brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a href="#contact" className="bg-secondary text-primary px-12 py-5 font-black text-base uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-2xl">
              Secure the Look
            </a>
            <a href="#collection" className="border border-accent/20 text-accent px-12 py-5 font-medium text-base uppercase tracking-widest hover:bg-white/5 transition-all duration-300">
              Explore Collection
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent/30">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-secondary to-transparent" />
        </div>
      </section>

      {/* Features Section (F-BENTO) */}
      <section id="atelier" ref={featuresReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-5xl font-black text-accent uppercase leading-none">The Atelier <br /> <span className="text-secondary/50">Standard</span></h2>
            </div>
            <p className="text-accent/40 max-w-xs text-lg">Uncompromising quality in every stitch of Nigerian excellence.</p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="md:col-span-2 bg-secondary/10 rounded-3xl p-10 border border-secondary/20 hover:border-secondary/50 transition-all duration-500 group flex flex-col justify-between min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <IconComponent name={features[0].icon} size={32} />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-accent uppercase mb-4">{features[0].title}</h3>
                <p className="text-accent/60 text-lg leading-relaxed max-w-xl">{features[0].description}</p>
              </div>
            </div>
            
            {features.slice(1).map((f, i) => (
              <div key={i} className="bg-white/5 rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-secondary">
                  <IconComponent name={f.icon} size={28} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-accent uppercase mb-3">{f.title}</h3>
                  <p className="text-accent/45 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider (D-QUOTE) */}
      <div className="py-24 px-8 text-center bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,black/10,transparent_70%)]" />
        <p className="relative font-heading text-4xl md:text-6xl font-black text-primary max-w-4xl mx-auto leading-tight uppercase">
          &ldquo;{brand.tagline}&rdquo;
        </p>
        <p className="relative text-primary/40 mt-8 text-xs tracking-[0.5em] font-black uppercase">Dessy Atelier — Lagos Nigeria</p>
      </div>

      {/* Products Section (P-STAGGER) */}
      <section id="collection" ref={productsReveal.ref} className="py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-heading text-6xl font-black text-accent uppercase leading-none mb-4">The <span className="text-secondary">Collection</span></h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-6" />
          </div>

          <div className="space-y-32">
            {products.map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl">
                    <SafeImage src={p.image_url} alt={p.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-full h-full border-2 border-secondary/20 rounded-[2rem] -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2`} />
                </div>
                
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-heading text-secondary text-2xl font-bold tracking-widest uppercase mb-4 block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl font-black text-accent leading-tight uppercase mb-6">{p.name}</h3>
                  <p className="text-accent/50 text-xl leading-relaxed mb-8 font-light">{p.description}</p>
                  <div className="flex flex-col gap-6">
                    <span className="text-4xl font-black text-secondary">{p.price}</span>
                    <a href="#contact" className={`flex items-center gap-4 text-accent font-bold uppercase tracking-[0.2em] group ${i % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                      Enquire Piece
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary group-hover:text-primary transition-all duration-300">
                        <ArrowUpRight size={20} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Split with Stats) */}
      <section id="story" ref={aboutReveal.ref} className="py-28 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl font-black text-accent uppercase leading-none mb-8">Our <span className="text-secondary">Narrative</span></h2>
            <p className="text-accent/60 text-xl leading-relaxed mb-10">
              Dessy Atelier was founded on the belief that fashion is the ultimate form of self-expression. Based in the vibrant landscape of Lagos, we transform cultural heritage into wearable art.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4 mx-auto md:mx-0">
                    <IconComponent name={s.icon} size={20} />
                  </div>
                  <p className="text-3xl font-heading font-black text-accent">{s.number}</p>
                  <p className="text-[10px] uppercase tracking-widest text-accent/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-secondary font-bold text-sm tracking-widest uppercase italic">
              Sharp delivery, nationwide. Lagos&apos; finest.
            </p>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.about} alt="Atelier Interior" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (T-MASONRY) */}
      <section ref={testimonialReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-accent text-center mb-20 uppercase tracking-tighter">Voices of <span className="text-secondary">Elegance</span></h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-secondary/30 transition-all duration-500 group transition-all duration-700 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-accent/80 text-lg leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center font-black text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-accent text-lg">{t.name}</p>
                    <p className="text-secondary text-xs uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (C3) */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-secondary font-heading text-xl italic mb-4 block">Let&apos;s Create</span>
          <h2 className="font-heading text-6xl font-black text-accent uppercase leading-none mb-6">Consult with the <br /> <span className="text-secondary">Designer</span></h2>
          <p className="text-accent/40 mb-16 text-lg max-w-xl mx-auto">Experience bespoke luxury. Leave your details below and our lead stylist will reach out for a private consultation.</p>
          
          <div className={`text-left transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-scaleIn bg-white/5 rounded-3xl border border-secondary/30">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/30 text-secondary">
                  <CheckCheck size={40} />
                </div>
                <h3 className="font-heading text-3xl font-black text-accent uppercase">Request Logged</h3>
                <p className="text-accent/50 mt-4 max-w-xs text-lg">We will contact you via WhatsApp or Email within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {(['name', 'email'] as const).map(field => (
                    <input key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-accent placeholder-white/20 outline-none focus:border-secondary transition-all text-lg" />
                  ))}
                </div>
                <input type="text" placeholder="Phone (WhatsApp Preferred)"
                  value={form.phone}
                  onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-accent placeholder-white/20 outline-none focus:border-secondary transition-all text-lg" />
                <textarea rows={5} placeholder="Tell us about the occasion..."
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-accent placeholder-white/20 outline-none focus:border-secondary transition-all text-lg resize-none" />
                <button type="submit" disabled={loading}
                  className="w-full bg-secondary text-primary py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-4">
                  {loading ? 'Processing...' : 'Request Consultation'}
                  {!loading && <ChevronRight size={24} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center font-heading text-2xl font-black text-primary">D</div>
                <span className="font-heading text-2xl font-bold tracking-tighter text-accent uppercase">Dessy<span className="text-secondary ml-1">Atelier</span></span>
              </div>
              <p className="text-accent/40 text-lg leading-relaxed max-w-sm mb-10">
                Crafting the future of African couture from the heart of Lagos. Redefining elegance for the global stage.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://instagram.com/dessy_atelier" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent/50 hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent/50 hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-8">Explore</h4>
              <ul className="space-y-4">
                {['Home', 'Collection', 'Atelier', 'Story', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-accent/40 hover:text-secondary transition-colors text-base font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-8">Visit</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <MapIcon size={20} className="text-secondary shrink-0" />
                  <span className="text-accent/40 text-sm leading-relaxed">Lagos, Nigeria</span>
                </li>
                <li className="flex gap-4">
                  <Mail size={20} className="text-secondary shrink-0" />
                  <span className="text-accent/40 text-sm">hello@dessyatelier.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
            <p className="text-accent/20 text-xs font-medium tracking-widest uppercase">
              © {new Date().getFullYear()} Dessy Atelier. All rights reserved.
            </p>
            <div className="flex gap-8 text-accent/20 text-xs font-medium tracking-widest uppercase">
              <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}