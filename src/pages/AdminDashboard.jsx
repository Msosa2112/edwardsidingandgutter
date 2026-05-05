import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Upload, Trash2, FolderEdit } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { toast } from 'react-hot-toast';

const SERVICES = ["Premium Siding", "Seamless Gutters", "Fascia & Soffit", "Window Trim", "Complete Exterior"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { photos, addPhoto, deletePhoto, updatePhotoCategory, loading } = usePhotos();
  const [filter, setFilter] = useState('All');
  
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La foto es muy grande. El tamaño máximo es 5MB.');
      return;
    }

    const toastId = toast.loading('Guardando foto...');
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Url = reader.result;
      const newPhoto = {
        id: `photo-${Date.now()}`,
        url: base64Url,
        category: filter === 'All' ? SERVICES[0] : filter
      };
      await addPhoto(newPhoto);
      toast.success('Foto subida exitosamente', { id: toastId });
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">Loading...</div>;

  const displayedPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans selection:bg-[#38bdf8] selection:text-white pb-32">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 spatial-glass-dark p-6 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/10 rounded-full filter blur-[80px]"></div>
          <div className="flex items-center gap-6 relative z-10">
            <img src="/logo.png" alt="Logo" className="h-16 object-contain filter brightness-110 drop-shadow-md" />
            <div>
              <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-white/60 text-sm">Organiza las fotos por tipo de servicio</p>
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl spatial-glass hover:bg-white/10 transition-colors font-medium border border-white/10">
              Ver Sitio
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-medium border border-red-500/20">
              <LogOut className="w-5 h-5" /> Salir
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="spatial-glass-dark p-6 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FolderEdit className="w-5 h-5 text-[#38bdf8]" /> Categorías
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setFilter('All')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${filter === 'All' ? 'bg-[#38bdf8] text-slate-900 font-bold' : 'hover:bg-white/5 text-white/70'}`}
                >
                  Todas las fotos
                </button>
                {SERVICES.map(srv => (
                  <button 
                    key={srv}
                    onClick={() => setFilter(srv)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${filter === srv ? 'bg-[#38bdf8] text-slate-900 font-bold' : 'hover:bg-white/5 text-white/70'}`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            <div className="spatial-glass-dark p-6 rounded-3xl border border-[#38bdf8]/30 border-dashed text-center bg-[#38bdf8]/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#38bdf8]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <input 
                type="file" 
                id="file-upload" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center relative z-10 py-4">
                <div className="bg-[#38bdf8]/20 p-4 rounded-full mb-4 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                  <Upload className="w-8 h-8 text-[#38bdf8]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Subir Foto</h3>
                <p className="text-white/50 text-xs">
                  (Máx 5MB) Guardado en local
                </p>
              </label>
            </div>
          </div>

          {/* Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{filter === 'All' ? 'Todas las Fotos' : filter}</h2>
              <span className="text-white/50 text-sm">{displayedPhotos.length} fotos</span>
            </div>
            
            {displayedPhotos.length === 0 ? (
              <div className="spatial-glass-dark p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center">
                <div className="bg-white/5 p-6 rounded-full mb-4">
                  <Trash2 className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-xl font-bold mb-2">No hay fotos en esta categoría</h3>
                <p className="text-white/50">Sube una nueva foto o cambia la categoría de las existentes.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPhotos.map(photo => (
                  <div key={photo.id} className="spatial-glass p-3 rounded-[2rem] border border-white/10 flex flex-col group hover:border-[#38bdf8]/50 transition-colors shadow-lg">
                    <div className="h-48 rounded-2xl overflow-hidden bg-black relative mb-4">
                      <img src={photo.url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <button 
                        onClick={() => deletePhoto(photo.id)}
                        className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-500 text-white p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-lg"
                        title="Eliminar foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="px-2 pb-2">
                      <label className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2 block">Categoría de Servicio</label>
                      <select 
                        value={photo.category}
                        onChange={(e) => updatePhotoCategory(photo.id, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#38bdf8]/50 focus:bg-slate-800/80 transition-colors appearance-none cursor-pointer"
                      >
                        {SERVICES.map(srv => (
                          <option key={srv} value={srv} className="bg-slate-800 text-white">{srv}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
