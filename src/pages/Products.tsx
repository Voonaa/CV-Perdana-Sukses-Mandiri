import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

const CATEGORIES = ['Semua', 'Videotron', 'Lampu Jalan Tenaga Surya', 'Meja Pelayanan Kantor Desa', 'Neon Box', 'Running Text', 'Papan Billboard', 'Plafon', 'Wastafel', 'Mesin Antrian'];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');
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

  const filtered = products.filter(p => {
    const matchesCat = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-industrial-black min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold font-mono text-sm uppercase tracking-widest font-bold">KATALOG SOLUSI</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-black text-white mb-12 tracking-tighter">
            INVENTARIS <span className="gold-text-gradient">INDUSTRI</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Cari berdasarkan nama peralatan atau spesifikasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-industrial-gray border border-white/10 rounded-xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-brand-gold transition-colors font-medium"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-4 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-brand-gold text-industrial-black' 
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-industrial-gray border border-white/5 rounded-2xl overflow-hidden hover:border-brand-gold/30 transition-all flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 px-4 py-1.5 glass-morphism rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-8 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3 mb-8 flex-grow">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                          <span className="text-gray-500 font-medium uppercase tracking-widest">{key}</span>
                          <span className="text-white font-bold">{value}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      to="/kontak"
                      className="w-full py-4 bg-white/5 group-hover:bg-brand-gold text-white group-hover:text-industrial-black font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      MINTA SPESIFIKASI <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
              <h3 className="text-2xl font-display font-bold text-gray-500">Tidak ada hasil yang sesuai dengan kriteria Anda.</h3>
              <button 
                onClick={() => { setActiveCategory('Semua'); setSearch(''); }}
                className="mt-6 text-brand-gold font-bold hover:underline"
              >
                Hapus semua filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-20 px-6 bg-industrial-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <CheckCircle className="w-12 h-12 text-brand-gold animate-pulse" />
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Dirancang untuk <span className="gold-text-gradient">Performa Tanpa Gagal</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Setiap peralatan dalam inventaris kami menjalani inspeksi dan sertifikasi yang ketat sebelum dikirim. Kami tidak hanya menjual produk; kami memberikan keandalan.
          </p>
        </div>
      </section>
    </div>
  );
}
