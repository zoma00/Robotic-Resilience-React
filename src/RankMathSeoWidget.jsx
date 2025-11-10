
import React from 'react';

// Only show a circular score indicator
const rankMathScore = 80; // Update this value manually after each analysis

const circleSize = 80;
const strokeWidth = 8;
const radius = (circleSize - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;
const percent = Math.max(0, Math.min(100, rankMathScore));
const offset = circumference - (percent / 100) * circumference;

const RankMathSeoWidget = () => (
  <div className="rank-math-glass-widget" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.2em',
    background: 'rgba(255,255,255,0.18)',
    borderRadius: '18px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 8px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: '1em 2em',
    margin: '1.5em auto',
    position: 'relative',
    overflow: 'hidden',
    width: 'fit-content',
    zIndex: 2
  }}>
    <svg width={circleSize} height={circleSize} style={{ flexShrink: 0 }}>
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        stroke="#eee"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        stroke="#e91e63"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="1.5em"
        fontWeight="bold"
        fill="#e91e63"
      >
        {rankMathScore}
      </text>
    </svg>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.7em' }}>
      <span style={{ fontSize: '1em', color: '#e91e63', fontWeight: 'bold' }}>Rank Math SEO Score</span>
      <span style={{ fontSize: '0.95em', color: '#059669', fontWeight: 'bold' }}>SEO analysis powered by Rank Math</span>
    </div>
  </div>
);

export default RankMathSeoWidget;
