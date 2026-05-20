'use client';

import { useEffect, useState, CSSProperties, ImgHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ImagePopupProps = ImgHTMLAttributes<HTMLImageElement> & {
  previewStyle?: CSSProperties;
  popupStyle?: CSSProperties;
};

export default function ImagePopup({ src, alt = 'popup image', previewStyle, popupStyle, ...props }: ImagePopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={styles['image-card']}
        style={{
          ...previewStyle,
        }}
        {...props}
      />

      {open && (
        <div onClick={() => setOpen(false)} className={styles['popup-card']}>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className={styles['popup-card__image']}
            style={{
              ...popupStyle,
            }}
            loading={'lazy'}
          />

          <button onClick={() => setOpen(false)} className={styles['popup-card__button']}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
    </>
  );
}
