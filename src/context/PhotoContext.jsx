import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const PhotoContext = createContext();

const SERVICES = ["Premium Siding", "Seamless Gutters", "Fascia & Soffit", "Window Trim", "Complete Exterior"];

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase.storage.from('gallery').list('', { limit: 100 });
      if (error) throw error;
      
      const loadedPhotos = data
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(file => {
          const publicUrl = supabase.storage.from('gallery').getPublicUrl(file.name).data.publicUrl;
          let category = "Premium Siding";
          
          if (file.name.includes('___')) {
            category = file.name.split('___')[0];
          }

          return {
            id: file.id,
            name: file.name,
            url: publicUrl,
            category
          };
        });

      // Sort by created_at descending (newest first), but list returns string array without created_at sometimes?
      // Actually list() returns { id, name, created_at, ... }
      loadedPhotos.sort((a, b) => b.name.localeCompare(a.name)); 
      
      setPhotos(loadedPhotos);
    } catch (err) {
      console.error("Failed to load photos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const addPhoto = async (photoObj) => {
    // photoObj.url is base64
    // We need to convert it to a Blob and upload
    try {
      const res = await fetch(photoObj.url);
      const blob = await res.blob();
      
      const ext = blob.type.split('/')[1] || 'jpg';
      const fileName = `${photoObj.category}___${Date.now()}.${ext}`;
      
      const { data, error } = await supabase.storage.from('gallery').upload(fileName, blob);
      if (error) throw error;
      
      await fetchPhotos(); // Refresh list
    } catch (err) {
      console.error("Error uploading", err);
      throw err;
    }
  };

  const deletePhoto = async (id, name) => {
    if (!name) {
      const photo = photos.find(p => p.id === id);
      if (photo) name = photo.name;
    }
    if (!name) return;
    
    try {
      const { error } = await supabase.storage.from('gallery').remove([name]);
      if (error) throw error;
      setPhotos(photos.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting", err);
      throw err;
    }
  };

  const updatePhotoCategory = async (id, newCategory) => {
    const photo = photos.find(p => p.id === id);
    if (!photo) return;
    
    const oldName = photo.name;
    // name is like "Premium Siding___123123123.jpg"
    const timestampPart = oldName.split('___')[1] || Date.now() + '.jpg';
    const newName = `${newCategory}___${timestampPart}`;
    
    try {
      const { error } = await supabase.storage.from('gallery').move(oldName, newName);
      if (error) throw error;
      await fetchPhotos(); // Refresh list
    } catch (err) {
      console.error("Error moving", err);
      throw err;
    }
  };

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, deletePhoto, updatePhotoCategory, loading }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotoContext);
