import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PackagePlus, LogOut, CheckCircle, Edit, Trash2, Save, X, List, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

export default function Admin() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [specList, setSpecList] = useState([{ key: 'Pitch', value: '2.5mm' }, { key: 'Refresh Rate', value: '3840Hz' }]);
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [products, setProducts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState<'list' | 'add' | 'edit' | 'inbox'>('list');
  
  // Custom Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'admin') {
      navigate('/login');
    } else {
      fetchProducts();
      fetchContacts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setDescription('');
    setSpecList([{ key: '', value: '' }]);
    setImage('');
    setFeatured(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Convert specList to JSON string
    const specsObj = specList.reduce((acc, item) => {
      if (item.key.trim()) acc[item.key.trim()] = item.value;
      return acc;
    }, {} as any);
    
    const specsString = JSON.stringify(specsObj);

    const endpoint = editingId ? `${API_BASE_URL}/api/products/${editingId}` : `${API_BASE_URL}/api/products`;
    const method = editingId ? 'PUT' : 'POST';

    const finalImage = image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, category, description, specs: specsString, image: finalImage, featured })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      setMessage(editingId ? 'Produk berhasil diupdate!' : 'Produk berhasil ditambahkan!');
      
      resetForm();
      setCurrentTab('list');
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    
    // Parse specs from JSON string or object
    let parsedSpecs = {};
    try {
      parsedSpecs = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
    } catch (e) {
      console.error('Failed to parse specs:', e);
    }
    
    const loadedSpecs = Object.entries(parsedSpecs).map(([key, value]) => ({ key, value: value as string }));
    setSpecList(loadedSpecs.length > 0 ? loadedSpecs : [{ key: '', value: '' }]);
    
    setImage(product.image);
    setFeatured(product.featured === 1 || product.featured === true);
    setCurrentTab('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    resetForm();
    setCurrentTab('list');
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${deletingId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Gagal menghapus');

      setMessage('Produk berhasil dihapus!');
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setDeletingId(null);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Gagal menghapus pesan');
      setMessage('Pesan berhasil dihapus!');
      fetchContacts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-industrial-black min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-industrial-gray border border-white/5 rounded-2xl p-6 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <LayoutDashboard className="text-brand-gold w-6 h-6" />
                <h2 className="text-xl font-display font-bold text-white">Admin Panel</h2>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => { setCurrentTab('list'); setEditingId(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    currentTab === 'list' || currentTab === 'edit'
                      ? 'bg-brand-gold text-industrial-black' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <List className="w-4 h-4" />
                  Daftar Produk
                </button>
                <button
                  onClick={() => { resetForm(); setCurrentTab('add'); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    currentTab === 'add' 
                      ? 'bg-brand-gold text-industrial-black' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <PackagePlus className="w-4 h-4" />
                  Tambah Produk
                </button>
                <button
                  onClick={() => { setCurrentTab('inbox'); setEditingId(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    currentTab === 'inbox' 
                      ? 'bg-brand-gold text-industrial-black' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Pesan Masuk
                  {contacts.length > 0 && (
                    <span className="ml-auto bg-white/10 text-white text-xs py-1 px-2 rounded-full">
                      {contacts.length}
                    </span>
                  )}
                </button>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-white/5">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-brand-gold font-mono text-sm uppercase tracking-widest font-bold">
                  {currentTab === 'list' ? 'Katalog' : currentTab === 'add' ? 'Input' : currentTab === 'inbox' ? 'Pesan' : 'Update'}
                </span>
              </div>
              <h1 className="text-5xl font-display font-black text-white tracking-tighter">
                {currentTab === 'list' ? 'DAFTAR' : currentTab === 'add' ? 'TAMBAH' : currentTab === 'inbox' ? 'PESAN' : 'EDIT'}{' '}
                <span className="gold-text-gradient">{currentTab === 'inbox' ? 'MASUK' : 'PRODUK'}</span>
              </h1>
            </div>

            {message && (
              <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 p-4 rounded-xl text-sm mb-6 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> {message}
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm mb-6 flex items-center gap-2">
                <X className="w-4 h-4" /> {error}
              </div>
            )}

            {/* Content Switcher */}
            {currentTab === 'list' && (
              <div className="bg-industrial-gray border border-white/5 rounded-2xl p-6 md:p-10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-white">
                    <thead className="text-xs uppercase text-gray-500 font-bold border-b border-white/10">
                      <tr>
                        <th className="py-4 px-4">Nama</th>
                        <th className="py-4 px-4">Kategori</th>
                        <th className="py-4 px-4">Featured</th>
                        <th className="py-4 px-4">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 font-bold">{product.name}</td>
                          <td className="py-4 px-4 text-gray-400">{product.category}</td>
                          <td className="py-4 px-4">
                            {product.featured === 1 || product.featured === true ? (
                              <span className="text-brand-gold text-xs font-bold uppercase">Ya</span>
                            ) : (
                              <span className="text-gray-600 text-xs font-bold uppercase">Tidak</span>
                            )}
                          </td>
                          <td className="py-4 px-4 flex gap-2">
                            <button 
                              onClick={() => handleEdit(product)}
                              className="p-2 bg-white/5 hover:bg-brand-gold hover:text-industrial-black rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(product.id)}
                              className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center py-10 text-gray-500">
                            Belum ada produk yang ditambahkan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {(currentTab === 'add' || currentTab === 'edit') && (
              <form onSubmit={handleSubmit} className="bg-industrial-gray border border-white/5 rounded-2xl p-6 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-2">Nama Produk</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-industrial-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
                      placeholder="Misal: Videotron P2.5 Indoor"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-2">Kategori</label>
                    <input 
                      type="text" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-industrial-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
                      placeholder="Misal: Videotron"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-2">Deskripsi Singkat</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-industrial-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors h-32"
                    placeholder="Deskripsi produk..."
                    required
                  />
                </div>

                {/* Dynamic Specs Input */}
                <div>
                  <label className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-2">Spesifikasi Produk</label>
                  <div className="space-y-3">
                    {specList.map((spec, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <input 
                          type="text" 
                          value={spec.key}
                          onChange={(e) => {
                            const newList = [...specList];
                            newList[index].key = e.target.value;
                            setSpecList(newList);
                          }}
                          className="w-1/3 bg-industrial-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
                          placeholder="Label (Misal: Pitch)"
                        />
                        <input 
                          type="text" 
                          value={spec.value}
                          onChange={(e) => {
                            const newList = [...specList];
                            newList[index].value = e.target.value;
                            setSpecList(newList);
                          }}
                          className="flex-grow bg-industrial-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
                          placeholder="Nilai (Misal: 2.5mm)"
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const newList = specList.filter((_, i) => i !== index);
                            setSpecList(newList.length > 0 ? newList : [{ key: '', value: '' }]);
                          }}
                          className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                          title="Hapus Baris"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSpecList([...specList, { key: '', value: '' }])}
                    className="mt-3 text-sm text-brand-gold font-bold flex items-center gap-2 hover:text-white transition-colors"
                  >
                    + Tambah Baris Spesifikasi
                  </button>
                </div>

                <div>
                  <label className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-2">URL Gambar Produk</label>
                  <input 
                    type="url" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-industrial-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="Contoh: https://images.unsplash.com/... (Kosongkan untuk default)"
                  />
                  {image && (
                    <img src={image} alt="Preview" className="mt-4 h-32 object-cover rounded-xl border border-white/10" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-5 h-5 accent-brand-gold"
                  />
                  <label htmlFor="featured" className="text-white text-sm font-bold">Tampilkan di Halaman Utama (Featured)</label>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="submit"
                    className="flex-grow py-4 bg-brand-gold text-industrial-black font-black text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all"
                  >
                    {currentTab === 'edit' ? (
                      <>UPDATE PRODUK <Save className="w-4 h-4" /></>
                    ) : (
                      <>TAMBAHKAN PRODUK <PackagePlus className="w-4 h-4" /></>
                    )}
                  </button>
                  
                  {currentTab === 'edit' && (
                    <button 
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      BATAL <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            )}

            {currentTab === 'inbox' && (
              <div className="bg-industrial-gray border border-white/5 rounded-2xl p-6 md:p-10 space-y-6">
                {contacts.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    Belum ada pesan masuk.
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="bg-industrial-black/50 border border-white/10 rounded-xl p-6 relative">
                      <button 
                        onClick={() => handleDeleteContact(contact.id)}
                        className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white font-bold text-lg">{contact.name}</h3>
                          <p className="text-brand-gold text-sm">{contact.email}</p>
                        </div>
                        <span className="text-gray-500 text-xs">
                          {new Date(contact.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric', month: 'long', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="inline-block bg-white/10 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                          {contact.inquiry_type}
                        </span>
                      </div>
                      <div className="bg-industrial-gray border border-white/5 rounded-lg p-4 text-gray-300 text-sm whitespace-pre-wrap">
                        {contact.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-industrial-gray border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-display font-bold text-white mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-400 mb-6">Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => { setShowDeleteModal(false); setDeletingId(null); }}
                className="flex-grow py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="flex-grow py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
