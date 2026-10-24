import React from 'react';

/**
 * BrandLogo - Sri Ananda Nilayam official brand logo.
 * Directly renders the original uploaded brand logo asset without reconstructing or approximating with HTML text.
 * Preserves the exact emblem, typography, colors, and tagline with aspect ratio intact.
 *
 * @param {'dark' | 'light'} variant
 *   'dark'  => Navy text with gold emblem for light/white backgrounds (e.g. Header nav, modals, light cards)
 *   'light' => White text with gold emblem for dark navy backgrounds (e.g. Sidebar, Footer, Login card)
 * @param {number} height - Height in pixels (width adjusts automatically to preserve aspect ratio)
 * @param {string} className - Optional custom class name
 * @param {object} style - Optional custom style overrides
 * @param {string} alt - Alt text for accessibility
 * @param {string} src - Optional custom image path override
 */
export default function BrandLogo({
  variant = 'dark',
  height = 40,
  className = '',
  style = {},
  alt = 'Sri Ananda Nilayam — Design, Construction & Interiors',
  src,
}) {
  const isDarkText = variant === 'dark';
  // Use transparent PNG with navy text for light backgrounds, and white text for dark navy backgrounds
  const logoSrc = src || (isDarkText ? '/images/logo-transparent.png' : '/images/logo-white.png');

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`brand-logo-img ${className}`}
      style={{
        height: `${height}px`,
        width: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      loading="eager"
    />
  );
}
