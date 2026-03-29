-- Add image fields to destinations
ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS cover_image text;

-- Create public storage bucket for travel images (5 MB per file)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'travel-images',
  'travel-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow all operations on objects inside travel-images bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename  = 'objects'
      AND policyname = 'Allow all on travel-images'
  ) THEN
    CREATE POLICY "Allow all on travel-images"
      ON storage.objects FOR ALL
      USING  (bucket_id = 'travel-images')
      WITH CHECK (bucket_id = 'travel-images');
  END IF;
END $$;
