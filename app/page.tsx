'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Scissors, RefreshCw, Ruler, BadgeCheck, 
  Instagram, Mail, Phone, MapPin, ImageOff, CheckCheck,
  ChevronRight, ArrowUpRight
} from 'lucide-react';

// --- Types ---
type Product = { name: string; description: string; price: string; image_url: string };
type Feature = { title: string; description: string; icon: string };
type Testimonial = { name: string; text: string; role: string };

// --- Hooks ---
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
  }, []);
  return { ref, isVisible };
};

// --- Components ---
function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} width={width} height={height} 
      className={className} priority={priority} onError={() => setError(true)} 
    />
  );
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-heading font-black tracking-tighter flex items-center gap-2">
          <div className="bg-accent text-black px-1.5 py-0.5 text-xl">D</div>
          <span>DESSY ATELIER</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Collection', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
            Secure the Bag
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button className="self-end mb-12 text-white/50 hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Collection', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-3xl font-heading font-bold hover:text-accent transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Lagos Office</p>
            <p className="text-white/60 text-sm">Mainland / Island, Lagos, Nigeria</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Page Content ---
const BRAND = {
  name: "Dessy Atelier",
  tagline: "FUTURE FASHION, NIGERIAN SOUL",
  description: "Uncompromising quality. Unmistakable style. Designing the next wave of luxury apparel from the heart of West Africa.",
  industry: "fashion"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
  products: [
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539109132381-31a1b972f0a0?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
  ]
};

const PRODUCTS: Product[] = [
  { name: "The Agbada Reimagined", description: "A contemporary take on the classic flowing garment, tailored in deep indigo silk.", price: "₦285,000", image_url: IMAGES.products[0] },
  { name: "Draped Mesh Maxi", description: "Evening piece featuring structured shoulders and fluid asymmetrical draping.", price: "₦145,500", image_url: IMAGES.products[1] },
  { name: "Structured Day Blazer", description: "Sharp oversized blazer cut from locally sourced Ankara fabric.", price: "₦98,000", image_url: IMAGES.products[2] },
  { name: "Adire Embellished Top", description: "Fitted Adire crop top featuring intricate pearl and sequin detailing.", price: "₦62,500", image_url: IMAGES.products[3] },
];

const FEATURES: Feature[] = [
  { title: "Curated Drops", description: "Limited edition releases that capture the current cultural moment in Lagos.", icon: "Scissors" },
  { title: "Easy Returns", description: "Hassle-free process for tailoring adjustments or exchanges on ready-to-wear.", icon: "RefreshCw" },
  { title: "Exclusive Members", description: "VIP access to pre-release fabrics and private styling consultations.", icon: "BadgeCheck" },
  { title: "Bespoke Tailoring", description: "Hand-fitted garments crafted precisely to your unique measurements.", icon: "Ruler" },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Tosin M.", text: "The fit was immaculate. It felt custom-made from the moment I stepped out. True Lagos luxury.", role: "Creative Director" },
  { name: "Aisha K.", text: "I needed a showstopper piece, and Dessy delivered. The detailing on the Adire top is insane.", role: "Entrepreneur" },
  { name: "Femi O.", text: "The materials used are top-tier. This isn't just clothing; it's an investment.", role: "Art Collector" },
];

export default function Page() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: productsRef, isVisible: productsVisible } = useScrollReveal();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollReveal();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleIcon = (name: string) => {
    const props = { size: 28, className: "text-accent" };
    switch(name) {
      case 'Scissors': return <Scissors {...props} />;
      case 'RefreshCw': return <RefreshCw {...props} />;
      case 'BadgeCheck': return <BadgeCheck {...props} />;
      case 'Ruler': return <Ruler {...props} />;
      default: return <ChevronRight {...props} />;
    }
  };

  return (
    <main className="relative">
      <Nav />

      {/* Hero: HR-A Pattern */}
      <section id="home" ref={heroRef} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent/10 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-accent/8 rounded-full blur-[140px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.04] pointer-events-none" />
        
        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter">
            {BRAND.tagline}
          </h1>
          <p className="text-white/50 mt-10 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            {BRAND.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#collection" className="bg-accent text-black px-12 py-5 font-black text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full">
              Secure the Bag
            </a>
            <a href="#about" className="border border-white/20 text-white px-12 py-5 font-bold text-lg hover:bg-white/10 transition-all duration-300 rounded-full">
              The Process
            </a>
          </div>
        </div>
      </section>

      {/* Divider: D-GRID (Funky Street Luxe) */}
      <div className="py-12 border-y border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6">
          {['Lagos Made', 'Quality wey go loud', 'Global Edge', 'Modern Roots', 'Bespoke'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-white/40 text-xs font-bold tracking-[0.3em] uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Products: P-ASYMMETRIC Staggered Masonry */}
      <section id="collection" ref={productsRef} className="py-32 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <div className={`transition-all duration-700 ${productsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="font-heading text-6xl md:text-7xl font-black text-white mb-4">THE COLLECTION</h2>
              <p className="text-white/40 text-lg uppercase tracking-widest">Selected silhouetts for the modern icon</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Featured */}
            <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden h-[650px] transition-all duration-1000 delay-100 ${productsVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <SafeImage src={PRODUCTS[0].image_url} alt={PRODUCTS[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <h3 className="font-heading text-4xl font-black text-white mb-2">{PRODUCTS[0].name}</h3>
                <p className="text-white/60 max-w-sm mb-6">{PRODUCTS[0].description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent text-3xl font-black">{PRODUCTS[0].price}</span>
                  <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors flex items-center gap-2">
                    Enquire <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Side Grid */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {PRODUCTS.slice(1, 3).map((p, i) => (
                <div key={i} className={`group relative rounded-3xl overflow-hidden transition-all duration-1000 delay-[300ms] ${productsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="font-heading text-2xl font-black text-white">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-accent font-bold text-xl">{p.price}</span>
                      <a href="#contact" className="text-white/70 hover:text-white transition flex items-center gap-1 text-sm font-bold uppercase tracking-widest">
                        Details <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className={`md:col-span-12 group relative rounded-3xl overflow-hidden h-[300px] transition-all duration-1000 delay-500 ${productsVisible ? 'opacity-100' : 'opacity-0'}`}>
              <SafeImage src={PRODUCTS[3].image_url} alt={PRODUCTS[3].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <div className="text-center">
                    <h3 className="font-heading text-3xl font-black text-white">{PRODUCTS[3].name}</h3>
                    <p className="text-accent font-black text-2xl mt-2">{PRODUCTS[3].price}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features: F-NUMBERED Alternating Row */}
      <section id="about" ref={featuresRef} className="py-32 px-6 bg-secondary text-primary overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-5xl md:text-6xl font-black mb-6">THE ATELIER DIFFERENCE</h2>
            <div className="w-24 h-2 bg-accent mx-auto" />
          </div>

          <div className="space-y-0 divide-y divide-primary/10">
            {FEATURES.map((f, i) => (
              <div key={i} className={`py-16 flex flex-col md:flex-row items-start gap-12 transition-all duration-1000 ${featuresVisible ? 'translate-x-0 opacity-100' : (i % 2 === 0 ? '-translate-x-20' : 'translate-x-20') + ' opacity-0'}`}>
                <span className="font-heading text-8xl font-black text-accent/20 tracking-tighter shrink-0 w-32 leading-none">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-black mb-4 uppercase tracking-tight">{f.title}</h3>
                  <p className="text-primary/70 text-lg leading-relaxed max-w-xl">{f.description}</p>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-2xl">
                  {handleIcon(f.icon)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials: T-SLIDER Auto-scroll */}
      <section ref={testimonialsRef} className="py-32 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white">VOICES OF LUXURY</h2>
        </div>
        
        <div className="w-full overflow-hidden relative">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={i} className="w-[350px] md:w-[450px] shrink-0 bg-white/5 border border-white/10 rounded-[2rem] p-10 backdrop-blur-sm">
                <div className="flex gap-1 mb-8">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-accent" />)}
                </div>
                <p className="text-white/80 leading-relaxed italic mb-10 text-xl font-medium">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-black font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-accent text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact: C3 Pattern */}
      <section id="contact" ref={contactRef} className="py-32 px-6 bg-secondary text-primary">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${contactVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <p className="text-accent font-black text-sm tracking-[0.4em] uppercase mb-4">Fitting</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black mb-6">BOOK YOUR PRIVATE SESSION</h2>
          <p className="text-primary/60 mb-16 text-xl leading-relaxed">
            Experience the pinnacle of Nigerian craftsmanship. Let&apos;s co-create your next masterpiece.
          </p>

          <div className="text-left bg-primary p-10 md:p-14 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-scaleIn">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/30">
                  <CheckCheck size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-black text-white">CONSULTATION BOOKED</h3>
                <p className="text-white/50 mt-4 max-w-xs mx-auto">Our atelier director will reach out to confirm your session within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-10 text-accent font-bold uppercase tracking-widest text-sm hover:underline">Send another request</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSent(true); }, 1500); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="FULL NAME" required
                    className="w-full bg-white/5 border-b-2 border-white/10 py-4 px-2 text-white font-bold outline-none focus:border-accent transition-all placeholder:text-white/20" />
                  <input type="email" placeholder="EMAIL ADDRESS" required
                    className="w-full bg-white/5 border-b-2 border-white/10 py-4 px-2 text-white font-bold outline-none focus:border-accent transition-all placeholder:text-white/20" />
                </div>
                <textarea rows={4} placeholder="TELL US ABOUT THE OCCASION" required
                  className="w-full bg-white/5 border-b-2 border-white/10 py-4 px-2 text-white font-bold outline-none focus:border-accent transition-all placeholder:text-white/20 resize-none" />
                <button type="submit" disabled={loading}
                  className="w-full bg-accent text-black py-5 rounded-full font-black text-xl hover:brightness-110 transition-all active:scale-[0.98]">
                  {loading ? 'PROCESSING...' : 'REQUEST FITTING'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <a href="#home" className="text-4xl font-heading font-black tracking-tighter flex items-center gap-3 mb-8">
                <div className="bg-accent text-black px-2 py-1 text-2xl">D</div>
                <span>DESSY ATELIER</span>
              </a>
              <p className="text-white/40 max-w-sm text-lg leading-relaxed">
                Elevating the narrative of West African fashion through uncompromising craftsmanship and global silhouettes.
              </p>
              <div className="flex gap-6 mt-10">
                <a href="https://instagram.com/dessy_atelier" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-accent text-sm">Navigation</h4>
              <ul className="space-y-4">
                {['Collection', 'About', 'Contact', 'Terms'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-accent text-sm">Find Us</h4>
              <div className="space-y-4 text-white/60">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 text-accent" />
                  <span>Victoria Island,<br/>Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-accent" />
                  <span>+234 800 DESSY ATELIER</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-xs font-bold tracking-widest uppercase">
            <p>© {new Date().getFullYear()} DESSY ATELIER. ALL RIGHTS RESERVED.</p>
            <p>LAGOS — LONDON — NEW YORK</p>
          </div>
        </div>
      </footer>
    </main>
  );
}