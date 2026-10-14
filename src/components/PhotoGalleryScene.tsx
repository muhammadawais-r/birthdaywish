import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  ArrowRight,
  Heart,
  Upload,
  RotateCcw,
  Check,
  Grid,
  Image as ImageIcon
} from 'lucide-react';
import { BIRTHDAY_DATA, PhotoItem } from '../data/birthdayData';

// Direct asset imports for Vite bundling guarantee
import photo1 from '../assets/images/zyan_photo_hoodie_1791956936158.jpg';
import photo2 from '../assets/images/zyan_photo_kurta_1791956937452.jpg';
import photo3 from '../assets/images/zyan_photo_cafe_1791956937718.jpg';
import photo4 from '../assets/images/zyan_photo_smirk_1791956938246.jpg';
import photo5 from '../assets/images/zyan_photo_suv_1791956938187.jpg';
import photo6 from '../assets/images/zyan_photo_garden_1791956938560.jpg';

const BUNDLED_ASSETS: Record<number, string> = {
  1: photo1,
  2: photo2,
  3: photo3,
  4: photo4,
  5: photo5,
  6: photo6,
};

interface PhotoGallerySceneProps {
  onContinue: () => void;
}

export const PhotoGalleryScene: React.FC<PhotoGallerySceneProps> = ({ onContinue }) => {
  const { photos } = BIRTHDAY_DATA;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<number, string>>({});
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'featured' | 'grid'>('featured');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Load any previously uploaded custom photos from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zyan_custom_photos');
      if (saved) {
        setCustomPhotos(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const currentPhoto: PhotoItem = photos[currentIndex];

  // Resolve source: Custom user upload -> Bundled asset -> Public URL -> Fallback
  const getPhotoSrc = (photo: PhotoItem): string => {
    if (customPhotos[photo.id]) {
      return customPhotos[photo.id];
    }
    if (BUNDLED_ASSETS[photo.id]) {
      return BUNDLED_ASSETS[photo.id];
    }
    return photo.localPath;
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  // Upload single photo replacement
  const handleSinglePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const updated = { ...customPhotos, [currentPhoto.id]: dataUrl };
      setCustomPhotos(updated);
      try {
        localStorage.setItem('zyan_custom_photos', JSON.stringify(updated));
      } catch {
        // quota exceeded fallback
      }
      setUploadSuccessMsg(`Updated Photo 0${currentPhoto.id} successfully!`);
      setTimeout(() => setUploadSuccessMsg(null), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Upload multiple photos at once
  const handleBatchPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const updated = { ...customPhotos };
    let processed = 0;
    const totalToProcess = Math.min(files.length, 6);

    for (let i = 0; i < totalToProcess; i++) {
      const file = files[i];
      const targetPhotoId = i + 1;
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        updated[targetPhotoId] = dataUrl;
        processed++;
        if (processed === totalToProcess) {
          setCustomPhotos({ ...updated });
          try {
            localStorage.setItem('zyan_custom_photos', JSON.stringify(updated));
          } catch {
            // quota exceeded fallback
          }
          setUploadSuccessMsg(`Loaded ${processed} custom photos!`);
          setTimeout(() => setUploadSuccessMsg(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleResetPhotos = () => {
    setCustomPhotos({});
    try {
      localStorage.removeItem('zyan_custom_photos');
    } catch {
      // ignore
    }
    setUploadSuccessMsg('Reset back to original curated portrait set.');
    setTimeout(() => setUploadSuccessMsg(null), 2500);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleSinglePhotoUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={multiFileInputRef}
        onChange={handleBatchPhotoUpload}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Eyebrow and Section Title */}
      <div className="text-center space-y-2 mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-300/80 bg-white/95 shadow-xs text-xs font-mono font-bold tracking-wider text-pink-600 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>MOMENTS WITH THE INTROVERT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#2e1b24] font-['Outfit',sans-serif]">
          Six Frames. One Unmatched Bro.
        </h2>
        <p className="text-xs sm:text-sm text-[#7c636f] max-w-md mx-auto">
          Every photo tells a chapter of Zyan Jigri's calm, effortless cool.
        </p>

        {/* Action Bar: Toggle View Mode & Upload Option */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'featured' ? 'grid' : 'featured')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200 text-xs font-semibold text-pink-700 hover:bg-pink-50 transition-colors shadow-xs cursor-pointer"
          >
            {viewMode === 'featured' ? (
              <>
                <Grid className="w-3.5 h-3.5" />
                <span>Show All 6 Grid</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Show Featured Carousel</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-300 text-xs font-semibold text-pink-700 hover:bg-pink-100 transition-colors shadow-xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Replace Photo 0{currentPhoto.id}</span>
          </button>

          <button
            type="button"
            onClick={() => multiFileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200 text-xs font-semibold text-[#6b4e5f] hover:bg-pink-50 transition-colors shadow-xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-pink-500" />
            <span>Upload My 6 Photos</span>
          </button>

          {Object.keys(customPhotos).length > 0 && (
            <button
              type="button"
              onClick={handleResetPhotos}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {uploadSuccessMsg && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium animate-fade-in mt-1">
            <Check className="w-3.5 h-3.5" />
            <span>{uploadSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* VIEW MODE 1: FEATURED CAROUSEL */}
      {viewMode === 'featured' && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-2xl bg-white/95 rounded-3xl border border-pink-200/90 shadow-[0_15px_45px_rgba(236,72,153,0.12)] p-4 sm:p-6 flex flex-col items-center transition-all duration-300"
        >
          {/* Top Header of Card: Photo Counter, Filename badge & Zoom button */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-pink-100 text-xs font-mono">
            <div className="flex items-center gap-2 font-bold text-pink-600">
              <span className="text-base sm:text-lg">0{currentIndex + 1}</span>
              <span className="text-pink-300">/</span>
              <span className="text-slate-400">0{photos.length}</span>
            </div>

            <span className="hidden sm:inline-block text-[#8c6d7d] text-[11px] font-sans italic truncate max-w-[280px]">
              "{currentPhoto.caption}"
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                aria-label="Expand photo to full screen"
                className="p-1.5 rounded-lg border border-pink-200 hover:bg-pink-50 text-pink-700 transition-colors cursor-pointer"
                title="Full Screen View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Container with high fidelity rendering */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] max-h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-pink-50/60 to-cream-card my-4 flex items-center justify-center border border-pink-100 shadow-inner group">
            <img
              src={getPhotoSrc(currentPhoto)}
              alt={`Zyan Jigri - ${currentPhoto.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Custom upload indicator badge */}
            {customPhotos[currentPhoto.id] && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-pink-600/90 backdrop-blur-xs text-white text-[10px] font-mono font-semibold shadow-md">
                CUSTOM UPLOAD
              </div>
            )}

            {/* Previous & Next overlay buttons */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-pink-200/80 text-pink-700 flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-pink-200/80 text-pink-700 flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Photo Info & Caption */}
          <div className="w-full text-center space-y-1 pt-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2e1b24] font-['Outfit',sans-serif]">
              {currentPhoto.title}
            </h3>
            <p className="text-xs sm:text-sm text-pink-700 italic font-medium">
              "{currentPhoto.caption}"
            </p>
            <p className="text-xs sm:text-sm text-[#6b4e5f] pt-1 max-w-md mx-auto">
              {currentPhoto.detail}
            </p>
          </div>

          {/* Interactive Thumbnail Strip */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 pt-3 border-t border-pink-100 w-full overflow-x-auto py-1">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to photo ${idx + 1}`}
                className={`relative w-11 h-14 sm:w-13 sm:h-16 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border-2 shrink-0 ${
                  idx === currentIndex
                    ? 'border-pink-500 ring-2 ring-pink-300 scale-105 shadow-md'
                    : 'border-pink-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={getPhotoSrc(p)}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FULL 6-PHOTO GRID */}
      {viewMode === 'grid' && (
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-2">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => {
                setCurrentIndex(idx);
                setViewMode('featured');
              }}
              className="group relative bg-white rounded-2xl border border-pink-200/80 shadow-[0_8px_25px_rgba(236,72,153,0.08)] overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-pink-50">
                <img
                  src={getPhotoSrc(photo)}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center bg-white/95">
                <div className="text-[10px] font-mono font-bold text-pink-500 uppercase">
                  Frame 0{photo.id}
                </div>
                <h4 className="text-sm font-bold text-[#2e1b24] font-['Outfit',sans-serif] truncate">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-[#7c636f] italic truncate mt-0.5">
                  "{photo.caption}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Expanded Fullscreen Modal */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            aria-label="Close expanded view"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative max-h-[82vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src={getPhotoSrc(currentPhoto)}
                alt={currentPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="text-center text-white mt-4 space-y-1">
              <h4 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif]">
                Photo 0{currentPhoto.id}: {currentPhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-pink-200 italic font-medium">
                "{currentPhoto.caption}"
              </p>
              <p className="text-xs text-white/70 max-w-md mx-auto">
                {currentPhoto.detail}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action to proceed to Friendship Letter */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base tracking-wide shadow-[0_8px_25px_rgba(236,72,153,0.28)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Heart className="w-4 h-4 text-pink-200 fill-pink-200" />
          <span>READ THE BIRTHDAY LETTER</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
        <span className="text-[11px] text-[#8c6d7d] font-mono">
          Phase 4 of 7 completed
        </span>
      </div>
    </div>
  );
};
