'use client';

export default function TestPage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'system-ui' }}>
      <h1>🔍 Image Diagnostic Test</h1>
      
      <div style={{ margin: '40px 0', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Test 1: Direct Image Load</h2>
        <img 
          src="/images/headshot.jpg" 
          alt="Headshot Test" 
          style={{ 
            width: '300px', 
            height: '300px', 
            border: '4px solid #000',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          onLoad={() => console.log('✅ Image loaded successfully!')}
          onError={(e) => {
            console.log('❌ Image failed to load');
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const error = document.getElementById('error-msg');
            if (error) error.style.display = 'block';
          }}
        />
        <div id="error-msg" style={{ display: 'none', color: 'red', marginTop: '20px', fontSize: '20px' }}>
          ❌ IMAGE NOT FOUND AT /images/headshot.jpg
        </div>
      </div>

      <div style={{ margin: '40px 0', padding: '20px', background: '#fff3cd', borderRadius: '8px' }}>
        <h2>Test 2: Check File Path</h2>
        <p>Click to test if server can find the image:</p>
        <a 
          href="/images/headshot.jpg" 
          target="_blank"
          style={{ 
            padding: '15px 30px', 
            background: '#007bff', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block',
            fontSize: '18px'
          }}
        >
          Open /images/headshot.jpg
        </a>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Should open your image in new tab. If you see 404, file is not in right place.
        </p>
      </div>

      <div style={{ margin: '40px 0', padding: '20px', background: '#d4edda', borderRadius: '8px' }}>
        <h2>Test 3: Manual Image Preview</h2>
        <p>Select your headshot from your computer:</p>
        <input 
          type="file" 
          accept="image/*"
          style={{ margin: '20px 0', fontSize: '16px' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = document.getElementById('preview-img') as HTMLImageElement;
                if (img && e.target?.result) {
                  img.src = e.target.result as string;
                  img.style.display = 'block';
                }
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <br/>
        <img 
          id="preview-img" 
          style={{ 
            display: 'none',
            maxWidth: '400px', 
            border: '4px solid green',
            borderRadius: '50%',
            marginTop: '20px'
          }} 
        />
      </div>

      <div style={{ margin: '40px 0', padding: '20px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'left' }}>
        <h2>📋 Checklist:</h2>
        <ul style={{ fontSize: '16px', lineHeight: '2' }}>
          <li>✓ File is at: <code>Desktop\femi-austin-clean\public\images\headshot.jpg</code></li>
          <li>✓ File name is exactly: <code>headshot.jpg</code> (lowercase)</li>
          <li>✓ Server restarted after adding file</li>
          <li>✓ Browser hard refreshed (Ctrl+Shift+R)</li>
        </ul>
      </div>
    </div>
  );
}
