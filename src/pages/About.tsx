import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Landmark, Globe, Hammer, Shield, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-industrial-black min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold font-mono text-sm uppercase tracking-widest font-bold">CERITA KAMI</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter">
                PENGUASAAN <br /> <span className="gold-text-gradient">INDUSTRI</span>.
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Didirikan di atas prinsip daya tahan dan presisi, CV Perdana Sukses Mandiri telah berkembang dari pemasok lokal menjadi kekuatan solusi industri skala nasional.
              </p>
              <div className="flex gap-12 mt-12">
                 <div>
                   <div className="text-4xl font-display font-bold text-white mb-1">2009</div>
                   <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Didirikan</div>
                 </div>
                 <div>
                   <div className="text-4xl font-display font-bold text-white mb-1">450+</div>
                   <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Proyek Sukses</div>
                 </div>
                 <div>
                   <div className="text-4xl font-display font-bold text-white mb-1">Tangerang</div>
                   <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Kantor Pusat</div>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold/10 blur-[100px] -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5f9509df?auto=format&fit=crop&q=80&w=1000" 
                alt="Tim Konstruksi"
                className="rounded-2xl shadow-3xl grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute -bottom-10 -right-10 bg-industrial-gray border border-white/10 p-8 rounded-2xl shadow-2xl hidden md:block group">
                 <Landmark className="w-12 h-12 text-brand-gold mb-4 group-hover:rotate-12 transition-transform" />
                 <h4 className="text-lg font-bold text-white">Lisensi Nasional</h4>
                 <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Mitra Industri Grade A</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 px-6 bg-industrial-gray/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display font-bold text-white mb-6">Nilai Inti yang <span className="gold-text-gradient">Menggerakkan Kami</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Beroperasi di persimpangan ketangguhan tradisional dan inovasi modern, kami menjunjung standar yang memastikan nilai jangka panjang bagi klien kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Presisi Mutlak', desc: 'Setiap perhitungan, setiap pengelasan, dan setiap piksel dieksekusi dengan perhatian obsesif terhadap detail.' },
              { icon: Hammer, title: 'Daya Tahan Tak Tergoyahkan', desc: 'Peralatan kami dibangun untuk jangka panjang, bertahan di kondisi terberat yang ditawarkan nusantara.' },
              { icon: Users, title: 'Pertumbuhan Bersama', desc: 'Kami memandang klien sebagai mitra. Keberhasilan industri Anda adalah metrik utama dari keberhasilan kami.' },
              { icon: Globe, title: 'Inovasi Hijau', desc: 'Memimpin transisi ke praktik industri berkelanjutan melalui solusi tenaga surya dan efisiensi daya.' },
              { icon: Shield, title: 'Operasi Etis', desc: 'Transparansi dalam setiap kontrak dan integritas dalam setiap pengiriman. Tidak ada jalan pintas, selamanya.' },
              { icon: Zap, title: 'Keunggulan Teknologi', desc: 'Integrasi konstan videotron terbaru dan teknologi IoT ke dalam industri berat klasik.' }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-industrial-black p-10 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all group"
              >
                <div className="w-12 h-12 bg-industrial-light-gray rounded-lg flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-industrial-black transition-colors">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
