export type Category = 'Videotron' | 'Lampu Jalan Tenaga Surya' | 'Meja Pelayanan Kantor Desa' | 'Neon Box' | 'Running Text' | 'Papan Billboard' | 'Plafon' | 'Wastafel' | 'Mesin Antrian';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  specs: Record<string, string>;
  image: string;
  featured?: boolean;
  price?: number;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface Statistics {
  label: string;
  value: string;
  icon: string;
}
