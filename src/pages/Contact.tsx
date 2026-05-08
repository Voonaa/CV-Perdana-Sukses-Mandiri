import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export default function Contact() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`, '_blank');
  };

  return (
    <div className="bg-industrial-black min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold font-mono text-sm uppercase tracking-widest font-bold">DEPARTEMEN KONTAK</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter">
              MULAI <br />
              <span className="gold-text-gradient">KONSULTASI</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-md mb-12 leading-relaxed">
              Tim teknik dan penjualan kami siap mendiskusikan kebutuhan industri Anda. Harapkan tanggapan dalam 24 jam kerja.
            </p>

            <div className="space-y-10">
              <button 
                onClick={handleWhatsApp}
                className="flex items-center gap-4 px-8 py-4 bg-[#25D366] text-white rounded-xl font-black hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                HUBUNGI VIA WHATSAPP
              </button>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-industrial-gray rounded-xl flex items-center justify-center text-brand-gold border border-white/5 group-hover:bg-brand-gold group-hover:text-industrial-black transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Pertanyaan Email</h4>
                  <p className="text-xl font-bold text-white">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-industrial-gray rounded-xl flex items-center justify-center text-brand-gold border border-white/5 group-hover:bg-brand-gold group-hover:text-industrial-black transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Lini Langsung</h4>
                  <p className="text-xl font-bold text-white">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 bg-industrial-gray rounded-xl flex items-center justify-center text-brand-gold border border-white/5 group-hover:bg-brand-gold group-hover:text-industrial-black transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Alamat Pusat</h4>
                  <p className="text-xl font-bold text-white">
                    CV Perdana Sukses Mandiri<br />
                    Pringsewu Tim., Kec. Pringsewu<br />
                    Kab. Pringsewu, Lampung 35373
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden grayscale contrast-125 border border-white/10 h-64">
              <iframe 
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1!2d104.9!3d-5.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTgnMzUuNyJTIDEwNMKwNTUnMjkuNSJF!5e0!3m2!1sid!2sid!4v1715172000000!5m2!1sid!2sid`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-industrial-gray border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 p-8">
               <div className="w-16 h-16 border-r border-t border-brand-gold/20" />
            </div>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="w-full bg-industrial-black/50 border border-white/5 rounded-xl px-6 py-4 text-white focus:border-brand-gold focus:outline-none transition-colors" 
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Email Kerja</label>
                  <input 
                    type="email" 
                    className="w-full bg-industrial-black/50 border border-white/5 rounded-xl px-6 py-4 text-white focus:border-brand-gold focus:outline-none transition-colors" 
                    placeholder="budi@perusahaan.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Jenis Pertanyaan</label>
                <select className="w-full bg-industrial-black/50 border border-white/5 rounded-xl px-6 py-4 text-white focus:border-brand-gold focus:outline-none transition-colors appearance-none">
                  <option>Proyek Videotron</option>
                  <option>Penerangan Jalan Surya</option>
                  <option>Furnitur Kantor Desa</option>
                  <option>Running Text & Billboard</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Pesan / Kebutuhan</label>
                <textarea 
                  rows={5}
                  className="w-full bg-industrial-black/50 border border-white/5 rounded-xl px-6 py-4 text-white focus:border-brand-gold focus:outline-none transition-colors" 
                  placeholder="Ceritakan tentang proyek Anda atau kebutuhan peralatan khusus..."
                />
              </div>

              <button className="w-full py-6 bg-brand-gold text-industrial-black font-black text-lg rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl">
                KIRIM PERMINTAAN <Send className="w-5 h-5" />
              </button>
              
              <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest pt-4">
                Dengan mengirimkan, Anda menyetujui kebijakan pemrosesan data kami untuk pertanyaan industri.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
