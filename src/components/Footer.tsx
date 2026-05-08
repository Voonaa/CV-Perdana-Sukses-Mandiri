import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-industrial-gray border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              Mendorong Pertumbuhan <br />
              <span className="gold-text-gradient">Industri Berkinerja Tinggi</span>
            </h2>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              Kami berspesialisasi dalam memberikan solusi industri yang krusial. Dari pengadaan barang hingga infrastruktur digital, kami menyediakan fondasi yang mendorong perusahaan modern.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Tautan Cepat</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Beranda', path: '/' },
                { label: 'Produk', path: '/produk' },
                { label: 'Tentang Kami', path: '/tentang' },
                { label: 'Kontak', path: '/kontak' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-400 hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Hubungi Kami</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-sm">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-sm">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-sm">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-500">
            © 2024 CV Perdana Sukses Mandiri. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
