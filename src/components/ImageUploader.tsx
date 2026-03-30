import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, X, Star } from 'lucide-react';

export type CoverSource =
  | { type: 'existing'; url: string }
  | { type: 'pending'; idx: number }
  | null;

interface ImageUploaderProps {
  existingImages: string[];
  pendingPreviews: string[];
  cover: CoverSource;
  onAddFiles: (files: FileList) => void;
  onRemoveExisting: (url: string) => void;
  onRemovePending: (idx: number) => void;
  onSetCover: (source: CoverSource) => void;
  maxImages?: number;
}

const MAX_IMAGES = 10;

const ImageUploader = ({
  existingImages,
  pendingPreviews,
  cover,
  onAddFiles,
  onRemoveExisting,
  onRemovePending,
  onSetCover,
  maxImages = MAX_IMAGES,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const total = existingImages.length + pendingPreviews.length;
  const canAdd = total < maxImages;

  const isCoverExisting = (url: string) => cover?.type === 'existing' && cover.url === url;
  const isCoverPending = (idx: number) => cover?.type === 'pending' && cover.idx === idx;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground/70 tracking-wide">
          Fotos del viaje
        </span>
        <span className="text-[11px] text-muted-foreground/40">
          {total}/{maxImages}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Existing images */}
        {existingImages.map((url) => {
          const isCover = isCoverExisting(url);
          return (
            <motion.div
              key={url}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              style={{
                border: isCover
                  ? '2px solid hsl(var(--primary))'
                  : '2px solid hsl(var(--border) / 0.4)',
              }}
              whileHover={{ scale: 1.04 }}
              onClick={() => onSetCover({ type: 'existing', url })}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
              {/* Cover badge */}
              {isCover && (
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Star size={8} fill="white" className="text-white" />
                </div>
              )}
              {/* Delete */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onRemoveExisting(url); }}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
              >
                <X size={9} className="text-white" />
              </button>
            </motion.div>
          );
        })}

        {/* Pending images */}
        {pendingPreviews.map((preview, idx) => {
          const isCover = isCoverPending(idx);
          return (
            <motion.div
              key={`pending-${idx}`}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              style={{
                border: isCover
                  ? '2px solid hsl(var(--primary))'
                  : '2px solid hsl(var(--border) / 0.4)',
              }}
              whileHover={{ scale: 1.04 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onSetCover({ type: 'pending', idx })}
            >
              <img src={preview} alt="" className="w-full h-full object-cover" />
              {/* "New" overlay indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-blue-500/40 to-transparent pointer-events-none" />
              {/* Cover badge */}
              {isCover && (
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Star size={8} fill="white" className="text-white" />
                </div>
              )}
              {/* Delete */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onRemovePending(idx); }}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
              >
                <X size={9} className="text-white" />
              </button>
            </motion.div>
          );
        })}

        {/* Add button */}
        {canAdd && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-border/40 hover:border-primary/40 flex items-center justify-center text-muted-foreground/40 hover:text-primary/60 transition-all"
          >
            <ImagePlus size={18} />
          </motion.button>
        )}
      </div>

      {total > 0 && (
        <p className="text-[10px] text-muted-foreground/35 leading-relaxed">
          Toca una foto para marcarla como portada
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
