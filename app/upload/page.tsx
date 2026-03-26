'use client';

import { useState, useEffect } from 'react';

export default function UploadPage() {
  const [imageData, setImageData] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('headshot');
    if (saved) setImageData(saved);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImageData(base64);
        localStorage.setItem('headshot', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>📸 Upload Your Headshot</h1>
      
      <input 
        type="file" 
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          padding: '20px',
          fontSize: '18px',
          border: '3px dashed #000',
          borderRadius: '10px',
          width: '100%',
          marginBottom: '30px'
        }}
      />

      {imageData && (
        <div style={{ textAlign: 'center' }}>
          <img 
            src={imageData}
            alt="Preview"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '5px solid #000',
              marginBottom: '30px'
            }}
          />
          <br/>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              background: '#000',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '20px'
            }}
          >
            ← Back to Homepage
          </a>
        </div>
      )}
    </div>
  );
}
