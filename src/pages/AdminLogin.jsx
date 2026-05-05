import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'edwardsidingandgutters@gmail.com' && password === 'Edwardsiding00@!') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4">
      <div className="spatial-glass-dark p-8 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#38bdf8]/20 rounded-full filter blur-[50px]"></div>
        <div className="text-center mb-8 relative z-10">
          <img src="/logo.png" alt="Edward Siding & Gutter" className="mx-auto h-24 object-contain filter brightness-110 mb-6 drop-shadow-lg" />
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-white/60">Inicia sesión para administrar las fotos</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-6 text-center text-sm relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8]/50 transition-colors"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#38bdf8]/50 transition-colors"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#38bdf8] text-slate-900 font-bold py-3 rounded-xl hover:bg-white transition-colors flex justify-center items-center gap-2 mt-4">
            Ingresar <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
