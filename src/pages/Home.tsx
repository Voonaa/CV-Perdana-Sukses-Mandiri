import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Play, Shield, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STATS } from '../constants';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const parsedData = data.map((p: any) => ({
          ...p,
          specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs
        }));
        setProducts(parsedData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden industrial-grid">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-black via-industrial-black/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" 
            alt="Industrial backdrop"
            className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[10s]"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold font-mono text-sm uppercase tracking-[0.3em] font-semibold">BERDIRI SEJAK 2009</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 leading-[1.1] tracking-tighter">
              SOLUSI <br />
              <span className="gold-text-gradient">INDUSTRI</span> <br />
              PRESISI.
            </h1>
            
            <p className="text-xl text-gray-400 max-w-xl mb-12 leading-relaxed">
              Membekali perusahaan modern dengan videotron, lampu surya, dan infrastruktur kantor yang dibangun untuk performa maksimal.
            </p>

            <div className="flex flex-wrap gap-5">
              <Link 
                to="/produk" 
                className="px-10 py-5 bg-white text-industrial-black font-bold rounded flex items-center gap-3 hover:bg-brand-gold transition-all translate-y-0 hover:-translate-y-1 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-brand-gold/30"
              >
                JELAJAHI SOLUSI
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => document.getElementById('advantage')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 glass-morphism text-white font-bold rounded flex items-center gap-3 hover:bg-white/10 transition-all border border-white/20"
              >
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                  <Play className="w-3 h-3 text-industrial-black fill-current ml-0.5" />
                </div>
                PROSES KAMI
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 opacity-20 pointer-events-none">
          <div className="w-full h-full border-l border-t border-brand-gold/20" />
          <div className="absolute top-0 right-0 p-12">
             <span className="text-[200px] font-display font-black text-white/5 select-none leading-none">PSM</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-industrial-black py-20 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-display font-black gold-text-gradient mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold font-mono text-xs uppercase tracking-widest font-bold">PORTOFOLIO UTAMA</span>
              </div>
              <h2 className="text-5xl font-display font-bold text-white tracking-tight">Infrastruktur <br /><span className="text-gray-500">Misi-Kritis</span></h2>
            </div>
            <Link to="/produk" className="text-brand-gold font-bold flex items-center gap-2 hover:translate-x-2 transition-transform mb-2">
              LIHAT SEMUA PERALATAN <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.featured === 1 || p.featured === true).slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-industrial-gray rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-industrial-black to-transparent" />
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <div className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.2em] mb-2 font-bold">{product.category}</div>
                   <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                   <p className="text-sm text-gray-400 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                     {product.description}
                   </p>
                   <Link to="/produk" className="w-full py-3 bg-white/10 hover:bg-white text-white hover:text-industrial-black text-sm font-bold rounded flex items-center justify-center gap-2 transition-all">
                     SPESIFIKASI <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section id="advantage" className="py-32 px-6 bg-industrial-gray/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-brand-gold/30" />
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" 
                alt="Keunggulan Industri"
                className="rounded-2xl shadow-2xl relative z-10 w-full max-w-md mx-auto h-[400px] object-cover"
              />
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-brand-gold/5 rounded-2xl -z-10" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold font-mono text-sm uppercase tracking-widest font-bold">MENGAPA MEMILIH KAMI</span>
              </div>
              <h2 className="text-5xl font-display font-bold text-white mb-8 tracking-tight">
                Standar untuk <br />
                <span className="gold-text-gradient">Keunggulan Industri</span>
              </h2>

              <div className="space-y-8">
                {[
                  { icon: Shield, title: 'Keandalan Bersertifikat', desc: 'Proses bersertifikat ISO dan perangkat keras yang diuji di lingkungan paling ekstrem.' },
                  { icon: Zap, title: 'Eksekusi Cepat', desc: 'Jaringan logistik yang dioptimalkan untuk penyebaran cepat di seluruh nusantara.' },
                  { icon: Target, title: 'Teknik Presisi', desc: 'Solusi khusus yang terintegrasi mulus ke dalam alur kerja Anda saat ini.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-industrial-light-gray flex items-center justify-center text-brand-gold border border-white/5 group-hover:bg-brand-gold group-hover:text-industrial-black transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div 
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          className="max-w-5xl mx-auto bg-brand-gold p-12 md:p-20 rounded-[2rem] text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-industrial-black opacity-0 group-hover:opacity-5 transition-opacity" />
          <h2 className="text-4xl md:text-6xl font-display font-black text-industrial-black mb-8 leading-tight">
            SIAP UNTUK MEMPERKUAT <br /> FASE BERIKUTNYA?
          </h2>
          <p className="text-xl text-industrial-black/70 mb-12 max-w-2xl mx-auto font-medium">
            Bergabunglah dengan ratusan perusahaan yang mempercayai CV Perdana Sukses Mandiri untuk infrastruktur industri kritis mereka.
          </p>
          <Link 
            to="/kontak#contact-form" 
            className="relative z-10 inline-flex items-center gap-3 px-12 py-6 bg-industrial-black text-white text-lg font-black rounded-xl hover:scale-105 transition-transform shadow-2xl"
          >
            MULAI KONSULTASI <ArrowRight className="w-6 h-6" />
          </Link>

          {/* Decorative icons behind CTA */}
          <HardHat className="absolute -bottom-10 -right-10 w-60 h-60 text-industrial-black/10 -rotate-12 pointer-events-none" />
        </motion.div>
      </section>
    </div>
  );
}

const HardHat = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <path d="M4 15v-3a6 6 0 0 1 6-6h0" />
    <path d="M14 6h0a6 6 0 0 1 6 6v3" />
  </svg>
);
