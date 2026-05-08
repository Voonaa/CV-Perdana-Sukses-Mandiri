import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/login' : '/api/register';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setIsLogin(true);
        setError('Registrasi berhasil! Silakan login.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-industrial-black min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-black via-industrial-black/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000" 
          alt="Industrial backdrop"
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-industrial-gray border border-white/10 rounded-2xl p-10 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            {isLogin ? 'Masuk ke Akun' : 'Daftar Member'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Akses fitur khusus member dan admin' : 'Bergabunglah dengan jaringan industri kami'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="email" 
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-gold transition-colors"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-brand-gold text-industrial-black font-black text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
          >
            {isLogin ? (
              <>MASUK <LogIn className="w-4 h-4" /></>
            ) : (
              <>DAFTAR <UserPlus className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-gold text-sm font-bold hover:underline"
          >
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
