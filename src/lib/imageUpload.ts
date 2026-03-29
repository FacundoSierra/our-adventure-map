import { supabase } from '@/integrations/supabase/client';

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 0.85;

async function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        blob => (blob ? resolve(blob) : reject(new Error('Compression failed'))),
        'image/jpeg',
        JPEG_QUALITY,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };
    img.src = objectUrl;
  });
}

export async function uploadImage(file: File, destinationId: string): Promise<string> {
  const blob = await compressImage(file);
  const slug = Math.random().toString(36).slice(2, 7);
  const path = `${destinationId}/${Date.now()}-${slug}.jpg`;
  const { error } = await supabase.storage
    .from('travel-images')
    .upload(path, blob, { contentType: 'image/jpeg' });
  if (error) throw error;
  const { data } = supabase.storage.from('travel-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImage(publicUrl: string): Promise<void> {
  const match = publicUrl.match(/\/travel-images\/(.+)$/);
  if (!match) return;
  const path = decodeURIComponent(match[1].split('?')[0]);
  await supabase.storage.from('travel-images').remove([path]);
}
