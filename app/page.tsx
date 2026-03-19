'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCheck,
  ImageOff,
  Calendar,
  Shirt,
  Star,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

// --- Types & Data ---

const brand = {
  name: "Dessy Atelier",
  tagline: "Bespoke Lagos Couture for the Modern Icon",
  description: "A premier Lagos-based fashion house specializing in high-end bespoke tailoring and contemporary African couture. We blend traditional craftsmanship with avant-garde design to create timeless pieces for those who dare to stand out.",
  industry: "Fashion",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1639092064164-471711a89dd0?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1623609163747-e4586361ea46?q=80&w=1080",
    "https://images.unsplash.com/photo-1645654731316-a350fdcf3bae?q=80&w=1080",
    "https://images.unsplash.com/photo-1718435112323-c826511d5252?q=80&w=1080",
    "https://images.unsplash.com/photo-1546447245-77cf99a64334?q=80&w=1080"
  ]
};

const products = [
  { name: "The Signature Aso-Oke Blazer", price: "₦85,000", description: "Hand-woven traditional fabric met with modern structural tailoring." },
  { name: "Silk Drape Evening Gown", price: "₦120,000", description: "Fluid emerald silk designed to silhouette the body with effortless grace." },
  { name: "Hand-Beaded Corset Top", price: "₦45,000", description: "Intricate beadwork detailing on premium velvet for ultimate luxury." },
  { name: "Tailored Kaftan Set", price: "₦65,000", description: "Minimalist luxury featuring geometric embroidery and precision cuts." }
];

const features = [
  { title: "Bespoke Tailoring", description: "Precision-cut garments engineered to your exact measurements.", icon: Scissors },
  { title: "Curated Fabrics", description: "Only the finest silks, velvets, and hand-woven indigenous textiles.", icon: Sparkles },
  { title: "Global Shipping", description: "From Lagos to the world, we deliver excellence to your doorstep.", icon: Globe }
];

const stats = [
  { number: '10+', label: 'Years in Fashion' },
  { number: '500+', label: 'Bespoke Pieces' },
  { number: '100%', label: 'Satisfaction' }
];

const testimonials = [
  { name: "Adesua Okonjo", role: "Creative Director", text: "The fit was absolutely impeccable. I wore my blazer to a gala and I've never felt more confident." },
  { name: "Tunde Balogun", role: "Entrepreneur", text: "Dessy Atelier understands the modern man's need for both comfort and sharp aesthetics." },
  { name: "Ify Lawson", role: "Art Curator", text: "The attention to detail in their hand-beading is world-class. Truly a jewel of Lagos fashion." },
  { name: "Chioma Nwosu", role: "Media Personality", text: "Every piece I own from Dessy feels like a second skin. Avant-garde yet deeply rooted." }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#121212] to-[#C5A059]/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.1) => {
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

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-scaleIn">
      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/30">
        <CheckCheck size={28} className="text-accent" />
      </div>
      <h3 className="font-heading text-2xl font-bold text-white">Fitting Requested</h3>
      <p className="text-white/50 mt-2 max-w-xs">Our atelier will contact you shortly to confirm your session.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(['name', 'email'] as const).map(field => (
          <input key={field}
            type={field === 'email' ? 'email' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none focus:border-accent/50 focus:bg-white/10 transition-all" />
        ))}
      </div>
      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none focus:border-accent/50 focus:bg-white/10 transition-all" />
      <textarea rows={4} placeholder="Tell us about your occasion..."
        value={form.message}
        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
        required
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none resize-none focus:border-accent/50 focus:bg-white/10 transition-all" />
      <button type="submit" disabled={loading}
        className="w-full bg-accent text-black py-5 rounded-xl font-bold text-base hover:brightness-110 transition-all duration-300 disabled:opacity-60">
        {loading ? 'Processing...' : 'Secure Your Fitting'}
      </button>
    </form>
  );
};

// --- Main Page Sections ---

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRev = useScrollReveal();
  const productsRev = useScrollReveal();
  const featuresRev = useScrollReveal();
  const aboutRev = useScrollReveal();
  const testimonialsRev = useScrollReveal();
  const contactRev = useScrollReveal();

  return (
    <main className="relative">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-heading text-2xl font-black tracking-tighter text-white">
            DESSY <span className="text-accent">ATELIER</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Collection', 'Atelier', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase() === 'atelier' ? 'features' : item.toLowerCase()}`} 
                 className="text-xs uppercase tracking-[0.2em] font-bold text-white/70 hover:text-accent transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">
              Book Fitting
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col shadow-2xl">
          <button onClick={() => setIsMenuOpen(false)} className="self-end text-white mb-12">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Home', 'Collection', 'Atelier', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase() === 'atelier' ? 'features' : item.toLowerCase()}`} 
                 onClick={() => setIsMenuOpen(false)}
                 className="font-heading text-4xl font-black text-white hover:text-accent transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-accent font-bold text-sm mb-4">Lagos, Nigeria</p>
            <div className="flex gap-4">
              <Instagram className="text-white/40" size={20} />
              <Mail className="text-white/40" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* HERO-A: Full-screen gradient + blur orbs */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-primary px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" style={{ animationDelay: '2s' }} />
        
        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} ref={heroRev.ref}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tight">
            REDEFINING THE <br/> <span className="text-accent italic">LAGOS</span> SILHOUETTE
          </h1>
          <p className="text-white/50 mt-10 text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the intersection of traditional artistry and modern luxury. Sharp delivery, nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a href="#products" className="bg-accent text-black px-12 py-5 font-black text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full">
              View Collection
            </a>
            <a href="#features" className="border border-white/20 text-white px-12 py-5 font-bold text-lg hover:bg-white/5 transition-all duration-300 rounded-full">
              The Atelier
            </a>
          </div>
        </div>
      </section>

      {/* D-RULE Divider */}
      <div className="py-12 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase opacity-50">
          The Bespoke Experience
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* P-STAGGER: Alternating editorial rows */}
      <section id="products" className="py-28 px-6 bg-primary overflow-hidden" ref={productsRev.ref}>
        <div className="max-w-6xl mx-auto space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productsRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group">
                  <SafeImage 
                    src={IMAGES.products[i]} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-2/3 h-2/3 bg-accent/5 rounded-3xl -z-10 blur-3xl`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-accent text-sm font-bold tracking-[0.3em] uppercase mb-6 block">
                  Series 0{i + 1}
                </span>
                <h3 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                  {p.name}
                </h3>
                <p className="text-white/50 text-xl leading-relaxed mb-10">
                  {p.description}
                </p>
                <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  <a href="#contact" className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black hover:bg-accent transition-all">
                    Enquire Now <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-accent py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-8 md:py-4">
              <p className="text-6xl font-black text-black tracking-tight">{s.number}</p>
              <p className="text-black/60 text-sm mt-2 font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* F-BENTO: Asymmetric bento grid */}
      <section id="features" className="py-28 px-6 bg-primary" ref={featuresRev.ref}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-5xl md:text-6xl font-black text-white">THE ATELIER <br/> STANDARD</h2>
            </div>
            <p className="text-white/40 max-w-sm text-lg">Every garment is a manifesto of excellence, crafted by hand in our Lagos workshop.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-white/5 rounded-[2.5rem] p-12 border border-white/10 hover:border-accent/40 transition-all duration-700 flex flex-col justify-between group min-h-[400px] ${featuresRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Scissors size={32} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-white mb-4">{features[0].title}</h3>
                <p className="text-white/50 text-xl max-w-md leading-relaxed">{features[0].description}</p>
              </div>
            </div>
            <div className={`flex flex-col gap-6 ${featuresRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              {features.slice(1).map((f, i) => (
                <div key={i} className="bg-white/5 rounded-[2rem] p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 flex-1 flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    {i === 0 ? <Sparkles size={24} className="text-accent" /> : <Globe size={24} className="text-accent" />}
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D-QUOTE Divider */}
      <div className="py-24 px-8 text-center bg-accent/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/10,transparent_70%)]" />
        <p className="relative font-heading text-3xl md:text-5xl font-black text-white max-w-4xl mx-auto leading-tight">
          &ldquo;Fashion is the armor to survive the reality of everyday life.&rdquo;
        </p>
        <p className="relative text-white/30 mt-8 text-xs tracking-[0.5em] uppercase">The Dessy Philosophy</p>
      </div>

      {/* T-MASONRY: Masonry column layout */}
      <section id="testimonials" className="py-28 px-6 bg-primary" ref={testimonialsRev.ref}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white text-center mb-20 transition-all duration-700">VOICES OF THE ICONS</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-gradient-to-br from-white/10 to-transparent p-10 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-accent/30 transition-all duration-500 ${testimonialsRev.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="text-white/80 text-xl leading-relaxed relative z-10 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-10 relative z-10">
                  <div>
                    <p className="font-heading font-bold text-white text-lg">{t.name}</p>
                    <p className="text-accent font-bold text-xs uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent/40" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C3: Minimal centered Contact */}
      <section id="contact" className="py-32 px-6 bg-primary" ref={contactRev.ref}>
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${contactRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-accent font-mono text-xs tracking-[0.6em] uppercase mb-6 font-bold">Inquiry</p>
          <h2 className="font-heading text-6xl font-black text-white mb-8">SECURE YOUR FIT</h2>
          <p className="text-white/40 mb-16 text-xl leading-relaxed">
            Begin your bespoke journey. Fill out the form below and our head stylist will coordinate your measurement session.
          </p>
          <div className="text-left bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <h2 className="font-heading text-4xl font-black text-white mb-6">DESSY <span className="text-accent">ATELIER</span></h2>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
                Crafting the future of African luxury from the heart of Lagos. Excellence in every stitch.
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Collection', 'Atelier', 'Contact'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase() === 'atelier' ? 'features' : item.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-8">Contact</h4>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <MapPin size={20} className="text-accent shrink-0" />
                  <span className="text-white/40 text-sm">Victoria Island, <br/> Lagos, Nigeria</span>
                </li>
                <li className="flex gap-4 items-center">
                  <Phone size={20} className="text-accent shrink-0" />
                  <span className="text-white/40 text-sm">+234 (0) 800 ATELIER</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Dessy Atelier. All Rights Reserved.
            </p>
            <p className="text-white/20 text-xs tracking-widest uppercase">
              Crafted in Lagos, Nigeria.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}