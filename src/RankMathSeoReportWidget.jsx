
import React from 'react';

const seoScore = 80;
const statusColors = {
  good: '#059669',
  'needs-improvement': '#e91e63',
  missing: '#f59e42'
};
const legend = [
  { label: 'Good', color: statusColors.good },
  { label: 'Needs Improvement', color: statusColors['needs-improvement'] },
  { label: 'Missing', color: statusColors.missing }
];

const RankMathSeoReportWidget = () => {
  return (
    <section style={{
      background: 'rgba(255,255,255,0.18)',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      padding: '0.7em 1.2em',
      maxWidth: 320,
      margin: '1.2em auto',
      border: 'none'
    }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="45" stroke="#e0e0e0" strokeWidth="8" fill="none" style={{ filter: 'drop-shadow(0 0 8px #baffc9)' }} />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#00c853"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - seoScore / 100)}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 12px #baffc9), drop-shadow(0 0 24px #baffc9)' }}
          />
          <text x="50" y="56" textAnchor="middle" fontSize="2em" fill="#f8f8ff" fontWeight="bold" style={{ textShadow: '0 0 8px #fff, 0 0 16px #e0e0ff' }}>{seoScore}%</text>
        </svg>
      </div>
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: 6 }}>SEO Score</div>
        <div style={{ fontSize: '1.05em', color: '#f8f8ff', marginBottom: 8, fontWeight: 600, textShadow: '0 0 8px #fff, 0 0 16px #e0e0ff' }}>
          Your page is well-optimized for search engines. Keep improving!
        </div>
        <div style={{ fontSize: '1.05em', color: '#f8f8ff', marginBottom: 8, fontWeight: 600, textShadow: '0 0 8px #fff, 0 0 16px #e0e0ff' }}>
          SEO Score: <span style={{ fontWeight: 'bold', color: '#f8f8ff', textShadow: '0 0 8px #fff, 0 0 16px #e0e0ff' }}>{seoScore}%</span>
        </div>
        <div style={{ fontSize: '1em', color: '#f8f8ff', marginTop: 4, fontWeight: 600, textShadow: '0 0 8px #fff, 0 0 16px #e0e0ff' }}>
          Powered by <span style={{ fontWeight: 'bold', color: '#0073e6', textShadow: '0 0 8px #fff, 0 0 16px #b3e0ff' }}>Rank Math</span>
        </div>
      </div>
    </div>
  </section>
  );
}
export default RankMathSeoReportWidget;
