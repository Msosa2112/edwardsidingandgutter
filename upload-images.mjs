import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bvtzdqfrmejsaxawnwkz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_g25kgMKd6NNPcvJZxi4mNw_b_ON49Ji';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const galleryPath = path.join(process.cwd(), 'public', 'gallery');

async function uploadImages() {
  try {
    const files = fs.readdirSync(galleryPath);
    console.log(`Encontradas ${files.length} imágenes en public/gallery/`);

    for (const file of files) {
      if (file.startsWith('.') || (!file.endsWith('.jpg') && !file.endsWith('.jpeg') && !file.endsWith('.png') && !file.endsWith('.JPEG'))) continue;
      
      const filePath = path.join(galleryPath, file);
      const fileBuffer = fs.readFileSync(filePath);
      
      const category = "Premium Siding";
      // Formato para que el sistema lo lea: Categoria___timestamp.extension
      const ext = path.extname(file).replace('.', '');
      const newName = `${category}___${Date.now()}_${file}`;

      console.log(`Subiendo ${file}...`);
      
      const { data, error } = await supabase.storage
        .from('gallery')
        .upload(newName, fileBuffer, {
          contentType: `image/${ext.toLowerCase()}`,
          upsert: true
        });

      if (error) {
        console.error(`Error subiendo ${file}:`, error.message);
      } else {
        console.log(`✅ ${file} subido exitosamente.`);
      }
      
      // Esperar un poquito para no saturar
      await new Promise(r => setTimeout(r, 500));
    }
    
    console.log("¡Proceso completado!");
  } catch (error) {
    console.error("Error general:", error);
  }
}

uploadImages();
