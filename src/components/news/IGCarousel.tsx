import React from 'react';

// This component represents the visual layout of the IG Carousel slides.
// It can be used as a template for @vercel/og or satori to render PNGs dynamically.

export function IGSlide({ slideIndex, kicker, headline, body }: { slideIndex: number, kicker: string, headline?: string, body?: string }) {
  const bgNewsprint = "#F6F1E8";
  const textInk = "#111111";
  const textRed = "#C0272D";

  return (
    <div style={{
      width: '1080px',
      height: '1350px', // 4:5 aspect ratio for IG portrait
      backgroundColor: bgNewsprint,
      color: textInk,
      fontFamily: 'Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      padding: '80px',
      boxSizing: 'border-box'
    }}>
      
      {/* Top Branding */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `8px solid ${textInk}`, paddingBottom: '30px', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '80px', margin: 0, fontWeight: '900', letterSpacing: '-2px' }}>ADN</h1>
        <div style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Artist Daily News
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ 
          alignSelf: 'flex-start',
          backgroundColor: textInk, 
          color: bgNewsprint, 
          padding: '10px 20px', 
          fontSize: '28px', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          fontWeight: 'bold',
          marginBottom: '40px'
        }}>
          {kicker}
        </div>

        {slideIndex === 1 && headline && (
          <h2 style={{ fontSize: '96px', fontWeight: 'bold', lineHeight: 1.1, margin: '0 0 40px 0', letterSpacing: '-2px' }}>
            {headline}
          </h2>
        )}

        {body && (
          <p style={{ fontSize: '48px', lineHeight: 1.4, fontWeight: '500', color: slideIndex === 1 ? textRed : textInk, borderLeft: slideIndex === 1 ? `12px solid ${textRed}` : 'none', paddingLeft: slideIndex === 1 ? '40px' : '0', margin: 0 }}>
            {body}
          </p>
        )}
      </div>

      {/* Footer Details */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `2px solid ${textInk}`, paddingTop: '40px', marginTop: '60px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: `${textInk}99` }}>
          Artispreneur
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{slideIndex} / 5</span>
        </div>
      </div>
      
    </div>
  );
}
