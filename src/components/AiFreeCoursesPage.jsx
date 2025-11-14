
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AiFreeCoursesPage.css";


const AiFreeCoursesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-91S8R10CS0', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  // Slideshow image paths (public folder, use leading slash)
  const images = [
    '/Robotic-Resilience-React/assets/kit-photos/Ai/ai-human-brains.jpeg',
    '/Robotic-Resilience-React/assets/kit-photos/Ai/ai-vs-humanity.jpg',
    '/Robotic-Resilience-React/assets/kit-photos/Ai/ai-generated-girl-figure.jpg'
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="bg-slideshow">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="AI Free Courses Background"
            className={idx === activeIndex ? 'active' : ''}
            draggable={false}
          />
        ))}
      </div>
      <div className="ai-free-courses-body-frame" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        {/* Intro & Main Title */}
        <div className="ai-free-courses-container" style={{maxWidth: '700px', width: '100%', marginBottom: '2rem'}}>
          <h1 className="ai-free-courses-title" style={{textAlign:'center'}}> AI Free Learning Goals</h1>
          <h2 style={{fontWeight:700, fontSize:'1.3rem', marginBottom:'1rem', textAlign:'center'}}>🚀 The Hidden Synergy: How Free AI Education Fuels Smarter Machines</h2>
          <p style={{textAlign:'center'}}>Understand why free AI learning is a game-changer for machines.</p>
        </div>
        {/* Explanation & Symbiotic Relationship */}
        <div className="ai-free-courses-container" style={{maxWidth: '700px', width: '100%', marginBottom: '2rem'}}>
          <p style={{textAlign:'center'}}>
            We all know free AI courses help <em>people</em> learn—but did you realize they also help <em>AI systems</em> learn?
          </p>
          <p style={{textAlign:'center'}}>
            When users engage with AI-driven educational tools, they’re not just absorbing knowledge. They’re also generating <strong>valuable data</strong> that refines the very algorithms they’re studying. Here’s how this symbiotic relationship works:
          </p>
        </div>
        {/* 3 Ways List */}
        <div className="ai-free-courses-container" style={{maxWidth: '700px', width: '100%', marginBottom: '2rem'}}>
          <ul className="ai-free-courses-list" style={{textAlign:'left'}}>
            <li>🔍 3 Ways Free AI Courses Benefit AI Systems</li>
            <li>1️⃣ <strong>Training Data Goldmine</strong>: User interactions (queries, mistakes, progress patterns) create rich datasets to optimize AI models.</li>
            <li>2️⃣ <strong>Human Problem-Solving Blueprints</strong>: Observing how learners tackle challenges helps AI mimic human-like reasoning.</li>
            <li>3️⃣ <strong>Feedback Loops</strong>: Real-world usage exposes gaps in AI logic, enabling iterative improvements.</li>
          </ul>
        </div>
        {/* Win-Win */}
        <div className="ai-free-courses-container" style={{maxWidth: '700px', width: '100%', marginBottom: '2rem'}}>
          <p style={{textAlign:'center'}}>
            While the <strong>primary goal</strong> remains democratizing education, this secondary benefit creates a win-win:<br />
            &nbsp;&nbsp;- Learners gain skills 💡<br />
            &nbsp;&nbsp;- AI systems gain intelligence 🤖
          </p>
        </div>
        {/* Ethics */}
        <div className="ai-free-courses-container" style={{maxWidth: '700px', width: '100%', marginBottom: '2rem'}}>
          <p style={{textAlign:'center'}}>
            <strong>The Ethical Lens</strong>: Transparency matters. Organizations should clarify if/how they use educational data—but when done responsibly, this synergy could accelerate AI’s positive impact.
          </p>
        </div>
        <footer className="ai-free-courses-footer" style={{marginTop: '2rem', textAlign: 'center', padding: '1.2rem 0', background: 'rgba(255,255,255,0.13)', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(31,38,135,0.10)', minWidth: '280px', maxWidth: '700px', alignSelf: 'center'}}>
          <nav>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'inline-flex', gap: '2em'}}>
              <li><Link to="/" style={{color: '#f8f6f2', textShadow: '0 0 12px #fff, 0 0 24px #e5e7eb', fontWeight: 600, textDecoration: 'none'}}>Home</Link></li>
              <li><Link to="/war-survival-kit" style={{color: '#f8f6f2', textShadow: '0 0 12px #fff, 0 0 24px #e5e7eb', fontWeight: 600, textDecoration: 'none'}}>War Survival Kit</Link></li>
              <li><Link to="/navigation-tutorial" style={{color: '#f8f6f2', textShadow: '0 0 12px #fff, 0 0 24px #e5e7eb', fontWeight: 600, textDecoration: 'none'}}>Navigation Tutorial</Link></li>
              <li><Link to="/egypt-map" style={{color: '#f8f6f2', textShadow: '0 0 12px #fff, 0 0 24px #e5e7eb', fontWeight: 600, textDecoration: 'none'}}>Egypt Map</Link></li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default AiFreeCoursesPage;
