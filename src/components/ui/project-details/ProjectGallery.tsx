import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectGallery.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const content = {
    en: {
      gallery: 'Project Gallery',
      previous: 'Previous',
      next: 'Next',
      close: 'Close',
      imageCounter: 'Image {current} of {total}'
    },
    ar: {
      gallery: 'معرض المشروع',
      previous: 'السابق',
      next: 'التالي',
      close: 'إغلاق',
      imageCounter: 'صورة {current} من {total}'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextLightboxImage();
    } else if (e.key === 'ArrowLeft') {
      previousLightboxImage();
    }
  };

  return (
    <section className={styles.gallery} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.gallery__container}>
        <h2 className={styles.gallery__title}>{t.gallery}</h2>
        
        {/* Main Gallery */}
        <div className={styles.gallery__main}>
          <div className={styles.gallery__main_image}>
            <img 
              src={images[currentImageIndex]} 
              alt={`Project image ${currentImageIndex + 1}`}
              className={styles.gallery__image}
              onClick={() => openLightbox(currentImageIndex)}
            />
            <button 
              className={styles.gallery__zoom_btn}
              onClick={() => openLightbox(currentImageIndex)}
              title="Zoom"
            >
              <ZoomIn size={20} />
            </button>
            
            {images.length > 1 && (
              <>
                <button 
                  className={`${styles.gallery__nav_btn} ${styles.gallery__nav_btn_prev}`}
                  onClick={previousImage}
                  title={t.previous}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className={`${styles.gallery__nav_btn} ${styles.gallery__nav_btn_next}`}
                  onClick={nextImage}
                  title={t.next}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            
            <div className={styles.gallery__counter}>
              {t.imageCounter
                .replace('{current}', (currentImageIndex + 1).toString())
                .replace('{total}', images.length.toString())}
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className={styles.gallery__thumbnails}>
            {images.map((image, index) => (
              <div 
                key={index}
                className={`${styles.gallery__thumbnail} ${
                  index === currentImageIndex ? styles.gallery__thumbnail_active : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className={styles.gallery__thumbnail_image}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className={styles.gallery__lightbox}
          onClick={closeLightbox}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          <div className={styles.gallery__lightbox_content} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.gallery__lightbox_close}
              onClick={closeLightbox}
              title={t.close}
            >
              <X size={24} />
            </button>
            
            <img 
              src={images[lightboxImageIndex]} 
              alt={`Project image ${lightboxImageIndex + 1}`}
              className={styles.gallery__lightbox_image}
            />
            
            {images.length > 1 && (
              <>
                <button 
                  className={`${styles.gallery__lightbox_nav} ${styles.gallery__lightbox_nav_prev}`}
                  onClick={previousLightboxImage}
                  title={t.previous}
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  className={`${styles.gallery__lightbox_nav} ${styles.gallery__lightbox_nav_next}`}
                  onClick={nextLightboxImage}
                  title={t.next}
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            
            <div className={styles.gallery__lightbox_counter}>
              {t.imageCounter
                .replace('{current}', (lightboxImageIndex + 1).toString())
                .replace('{total}', images.length.toString())}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;