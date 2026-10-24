import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || {};
  const currentUrl = currentImg.url || currentImg;
  const currentAlt = currentImg.alt || currentImg.caption || 'Visual architectural exhibit';
  const currentCaption = currentImg.caption || currentImg.title || '';

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close Lightbox">
          <X size={26} />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button type="button" className="lightbox-btn lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous image">
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Main Image Stage */}
        <div className="lightbox-image-stage">
          <img src={currentUrl} alt={currentAlt} className="lightbox-img" />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button type="button" className="lightbox-btn lightbox-nav lightbox-next" onClick={onNext} aria-label="Next image">
            <ChevronRight size={32} />
          </button>
        )}

        {/* Footer info: caption + counter */}
        <div className="lightbox-footer">
          {currentCaption && <p className="lightbox-caption">{currentCaption}</p>}
          <span className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 11, 22, 0.94);
          backdrop-filter: blur(12px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: lbFadeIn 0.25s ease-out;
        }

        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-content {
          position: relative;
          width: 100%;
          max-width: 1100px;
          height: 100%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image-stage {
          max-width: 100%;
          max-height: calc(85vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: calc(85vh - 70px);
          object-fit: contain;
          border-radius: var(--radius-sm);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(214, 164, 59, 0.2);
          border: 1px solid rgba(214, 164, 59, 0.3);
        }

        .lightbox-btn {
          background: rgba(16, 42, 76, 0.7);
          border: 1px solid rgba(214, 164, 59, 0.4);
          color: #FFF;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          position: absolute;
          z-index: 10;
        }

        .lightbox-btn:hover {
          background: var(--color-gold);
          color: #061121;
          transform: scale(1.1);
        }

        .lightbox-close {
          top: -15px;
          right: -15px;
          width: 44px;
          height: 44px;
        }

        .lightbox-prev {
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
        }

        .lightbox-prev:hover {
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-next {
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
        }

        .lightbox-next:hover {
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-footer {
          margin-top: 1rem;
          text-align: center;
          color: var(--color-ivory);
        }

        .lightbox-caption {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
          color: var(--color-gold-light);
        }

        .lightbox-counter {
          font-size: 0.8rem;
          color: var(--color-slate-light);
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .lightbox-overlay {
            padding: 1rem;
          }
          .lightbox-prev {
            left: 5px;
          }
          .lightbox-next {
            right: 5px;
          }
          .lightbox-close {
            top: 5px;
            right: 5px;
          }
        }
      `}</style>
    </div>
  );
}
