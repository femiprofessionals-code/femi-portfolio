'use client';

import { useState, useEffect } from 'react';

export function HeadshotImage() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('headshot');
    if (saved) {
      setImageSrc(saved);
    } else {
      setImageSrc('/images/headshot.jpg');
    }
  }, []);

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #000 0%, #333 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '120px',
        fontWeight: 300,
        color: '#fff',
        fontStyle: 'italic'
      }}>
        FF
      </div>
    );
  }

  return (
    <>
      <img 
        src={imageSrc}
        alt="Femi Falade"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: imageSrc.startsWith('data:') || imageSrc === '/images/headshot.jpg' ? 'block' : 'none'
        }}
        onError={() => {
          setImageSrc('');
        }}
      />
      {!imageSrc && (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #000 0%, #333 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          fontWeight: 300,
          color: '#fff',
          fontStyle: 'italic'
        }}>
          FF
        </div>
      )}
    </>
  );
}
