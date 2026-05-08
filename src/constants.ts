import { Product, Statistics } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Videotron P2.5 Indoor High Resolution',
    category: 'Videotron',
    description: 'Tampilan visual kristal untuk ruang rapat, auditorium, dan pusat kontrol.',
    specs: {
      'Pitch': '2.5mm',
      'Refresh Rate': '3840Hz',
      'Brightness': '800 nits'
    },
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000',
    featured: true
  },
  {
    id: '2',
    name: 'Lampu Jalan All-in-One 100W',
    category: 'Lampu Jalan Tenaga Surya',
    description: 'Solusi penerangan jalan mandiri dengan panel surya terintegrasi dan baterai litium.',
    specs: {
      'Power': '100W',
      'Battery': 'LiFePO4 3.2V 60Ah',
      'Solar Panel': '18V 100W'
    },
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb6585828?auto=format&fit=crop&q=80&w=1000',
    featured: true
  },
  {
    id: '3',
    name: 'Meja Pelayanan Terpadu Minimalis',
    category: 'Meja Pelayanan Kantor Desa',
    description: 'Desain ergonomis khusus untuk efisiensi pelayanan administrasi kantor desa.',
    specs: {
      'Material': 'Solid Wood + HPL Finish',
      'Dimension': '240 x 80 x 110 cm',
      'Feature': 'Cable Management System'
    },
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=1000',
    featured: true
  },
  {
    id: '4',
    name: 'Neon Box Acrylic 2 Sisi',
    category: 'Neon Box',
    description: 'Identitas toko yang cerah dan tahan cuaca dengan lampu LED hemat energi.',
    specs: {
      'Frame': 'Aluminum Profile',
      'Cover': 'Acrylic 3mm',
      'Lighting': 'Samsung LED Modules'
    },
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=1000'
  }
];

export const STATS: Statistics[] = [
  { label: 'Tahun Pengalaman', value: '15+', icon: 'ShieldCheck' },
  { label: 'Proyek Selesai', value: '450+', icon: 'Briefcase' },
  { label: 'Kepuasan Klien', value: '98%', icon: 'Award' },
  { label: 'Lisensi Industri', value: '12', icon: 'FileText' }
];

export const CONTACT_INFO = {
  whatsapp: '+6288976738570',
  address: 'CV Perdana Sukses Mandiri, QFQP+2XJ Sukanagara, Tangerang Regency, Banten',
  googleMapsPlusCode: 'QFQP+2XJ',
  email: 'solutions@psm-industrial.com',
  phone: '+62 889-7673-8570'
};
