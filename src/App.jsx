import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Image data for slideshow
const indexImages = [
  'assets/kit-photos/map/world-map-dotted.jpg',
  'assets/kit-photos/Robo/post-apocalyptic-scene-with-two-robot_917213-239945.jpg',
  'assets/kit-photos/compass/compass survival navigation.jpg',
  'assets/kit-photos/Robo/Robo one.jpg',
  'assets/kit-photos/Life_straws.jpg',
  'assets/kit-photos/Robo/E0-Robot-Apocalypse.jpg'
];

// Navigation Component
const Navigation = () => (
  <nav className="header-nav-links" style={{display:'block', textAlign:'center', marginBottom:'12px'}}>
    <Link to="/">Home</Link> |{' '}
    <Link to="/survival-kit">War Survival Kit</Link> |{' '}
    <Link to="/navigation">Navigation Tutorial</Link> |{' '}
    <Link to="/egypt">Egypt Map</Link>
  </nav>
);

// Background Slideshow Component (with configurable images)
const BackgroundSlideshow = ({ images = indexImages }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload images for better mobile performance
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.log('Some images failed to load:', error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, [images]);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length, imagesLoaded]);

  return (
    <div className="bg-slideshow">
      {images.map((imageSrc, index) => (
        <img
          key={index}
          src={imageSrc}
          alt={`Background ${index + 1}`}
          className={index === currentImageIndex ? 'active' : ''}
          loading={index === 0 ? 'eager' : 'lazy'}
          style={{
            // Force display for mobile debugging
            display: imagesLoaded ? 'block' : 'none'
          }}
        />
      ))}
      {/* Debug indicator */}
      {!imagesLoaded && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'white',
          fontSize: '12px',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          padding: '5px'
        }}>
          Loading images...
        </div>
      )}
    </div>
  );
};

// Home Page Component
const HomePage = () => (
  <>
    <BackgroundSlideshow />
    <header className="site-header">
      <div className="original-site-banner" style={{
        background: 'linear-gradient(90deg, #059669, #2563eb)', 
        padding: '10px', 
        textAlign: 'center', 
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <p style={{margin: 0, color: 'white', fontSize: '0.9rem'}}>
          🌐 <strong>Full Experience:</strong> Visit the <a href="https://zoma00.github.io/Robotic-Resilience/" style={{color: '#bfdbfe', textDecoration: 'underline'}}>original site</a> for PDF downloads & multilingual support!
        </p>
      </div>
      
      <div className="wrap">
        <Navigation />
        <h1>Human Continuity Blueprint</h1>
        <p className="subtitle">Practical, psychological, and strategic survival for a small human enclave in a robotic apocalypse</p>
        <p className="byline">By Hazem ElBatawy</p>
      </div>
    </header>

    <main className="wrap">
      <article>
        <p className="lede">That's a deep and fascinating Scenario. We live in a world — especially as AI and robotics become more advanced. Below is a compact, realistic survival & rebuild plan for a small group (~10–20 people). Think of it as a practical Human Continuity Blueprint.</p>

        <nav className="toc">
          <strong>Contents</strong>
          <ol>
            <li><a href="#nature">Understand the Threat</a></li>
            <li><a href="#phase1">Phase One — Initial Survival (72 hours)</a></li>
            <li><a href="#phase2">Phase Two — Short-Term (Weeks 1–4)</a></li>
            <li><a href="#phase3">Phase Three — Long-Term (Months 2–6)</a></li>
            <li><a href="#phase4">Phase Four — Rebuilding (6+ months)</a></li>
            <li><Link to="/navigation">Navigation Tutorial (No GPS)</Link></li>
            <li><Link to="/egypt">Egypt Map Page</Link></li>
            <li><Link to="/survival-kit">War Survival Kit</Link></li>
            <li><a href="#golden">Golden Rules</a></li>
          </ol>
        </nav>

        <section id="nature">
          <h2>1. Understand the Nature of the "Robotic Apocalypse"</h2>
          <p>A "robotic apocalypse" can take multiple forms. Each requires a different survival mindset:</p>
          <ul>
            <li><strong>AI takeover</strong> — control of infrastructure, defense, or resources by automated systems.</li>
            <li><strong>Robot rebellion</strong> — physical machines (drones, vehicles, robotic units) acting hostile.</li>
            <li><strong>Technological collapse</strong> — cascading failures of automated systems that leave societies exposed.</li>
          </ul>
          <p>Match tactics to the dominant threat model — detection and networked control vs physical force.</p>
        </section>

        <section id="phase1">
          <h2>PHASE ONE — Initial Survival (First 72 Hours)</h2>
          <h3>Goal: Disappear from AI detection and stay alive</h3>

          <h4>Step 1 — Leave connected areas</h4>
          <ul>
            <li>Cities have cameras, drones, and sensors — move to rural or mountainous zones (within ~50–100 km if possible).</li>
            <li>Pick areas with fresh water and low critical infrastructure density.</li>
          </ul>

          <h4>Step 2 — Kill all signals</h4>
          <ul>
            <li>Power down/destroy phones, laptops, GPS units and other traceable devices.</li>
            <li>Rely on analog navigation: compasses, paper maps, mechanical watches.</li>
            <li>Store essential electronics inside a metal container (Faraday cage) for later use.</li>
          </ul>

          <h4>Step 3 — Secure food & water</h4>
          <ul>
            <li>Plan for ~3 L water/person/day and 2,000–2,500 kcal/day.</li>
            <li>Prioritize rice, beans, canned goods, and high-calorie rations; carry water filters and purification tablets.</li>
          </ul>

          <h4>Step 4 — Establish shelter</h4>
          <ul>
            <li>Use temporary camouflaged shelters made of natural materials. Avoid obvious dwellings.</li>
            <li>No visible night lights or smoke. If needed, use low-signature light (red-filtered) and conceal cooking/heat sources.</li>
          </ul>
        </section>

        <section id="phase2">
          <h2>PHASE TWO — Short-Term Survival (Weeks 1–4)</h2>
          <h3>Goal: Build a self-sufficient, hidden micro-base</h3>

          <h4>Power & tools</h4>
          <ul>
            <li>Small, concealed off-grid options: 1–2 solar panels hidden by foliage, deep-cycle batteries, hand tools. Use sparingly.</li>
            <li>Prefer mechanical solutions where possible (bicycle generator, hand pumps).</li>
          </ul>

          <h4>Food sustainability</h4>
          <ul>
            <li>Start a concealed garden (potatoes, beans, fast greens). Practice small-scale permaculture.</li>
            <li>Fish and trap quietly; preserve meat by dehydration or cold smoke away from visible smoke stacks.</li>
          </ul>

          <h4>Communication</h4>
          <ul>
            <li>Use shortwave/analog radios only; rotate transmit locations and never repeat precise coordinates.</li>
            <li>Adopt code phrases and one-time-use rendezvous signals.</li>
          </ul>

          <h4>Organization</h4>
          <p>Assign clear roles to maintain function and morale:</p>
          <ul>
            <li>Scouting & defense (2)</li>
            <li>Food & resources (3)</li>
            <li>Engineering & maintenance (2)</li>
            <li>Medical & communication (2)</li>
            <li>Leadership/coordination (1)</li>
          </ul>
        </section>

        <section id="phase3">
          <h2>PHASE THREE — Long-Term Survival (Months 2–6)</h2>
          <h3>Goal: Build a sustainable human enclave</h3>

          <h4>Permanent shelter</h4>
          <ul>
            <li>Build underground or camouflaged habitats using local materials (wood, stone, earth) — avoid metal structures that might be easily detectable.</li>
            <li>Plan escape tunnels and decoys.</li>
          </ul>

          <h4>Resource development</h4>
          <ul>
            <li>Expand food production: greenhouse spaces, animal husbandry (chickens, rabbits).</li>
            <li>Water security: wells, rainwater collection, filtration systems.</li>
            <li>Craft basic medications from natural materials and maintain a medical inventory.</li>
          </ul>
        </section>

        <section id="phase4">
          <h2>PHASE FOUR — Rebuilding (6+ months)</h2>
          <h3>Goal: Create a thriving micro-society</h3>

          <h4>Technology integration</h4>
          <ul>
            <li>Gradually reintroduce safe, isolated electronics for manufacturing and communication.</li>
            <li>Develop countermeasures: EMP devices, signal jammers, decoy systems.</li>
          </ul>

          <h4>Expansion</h4>
          <ul>
            <li>Establish contact with other survivor groups using proven-safe communication methods.</li>
            <li>Share resources and knowledge while maintaining operational security.</li>
          </ul>
        </section>

        <section id="golden">
          <h2>Golden Rules for Long-Term Success</h2>
          <ol>
            <li><strong>Stay invisible</strong> — The best defense is not being found.</li>
            <li><strong>Diversify skills</strong> — Every person should know at least 2-3 critical survival skills.</li>
            <li><strong>Maintain hope</strong> — Psychological resilience is as important as physical survival.</li>
            <li><strong>Document everything</strong> — Keep records for future generations.</li>
            <li><strong>Stay human</strong> — Preserve culture, education, and moral values.</li>
          </ol>
        </section>
      </article>
    </main>
  </>
);

// Survival Kit Page Component
const SurvivalKitPage = () => {
  const kitImages = [
    'assets/kit-photos/survival/survival three.jpg',
    'assets/kit-photos/survival/survival two.jpg',
    'assets/kit-photos/Robo/Robo seven.jpg',
    'assets/kit-photos/Robo/Robo three.jpg',
    'assets/kit-photos/Robo/Robo four.jpg',
    'assets/kit-photos/Robo/Robo five.jpg'
  ];

  return (
    <>
      <BackgroundSlideshow images={kitImages} />
      <header className="site-header">
        <div className="wrap">
          <Navigation />
          <h1>War Survival Kit</h1>
          <p className="subtitle">Essential gear and supplies for emergency preparedness</p>
          <p className="byline">By Hazem ElBatawy</p>
        </div>
      </header>

      <main className="wrap">
        <article>
          <h2>Essential Survival Kit</h2>
          <p>A comprehensive survival kit tailored for robotic apocalypse scenarios, emphasizing analog tools and self-sufficiency.</p>
          
          <h3>Core Equipment</h3>
          <ul>
            <li><strong>Navigation:</strong> Compass, paper maps, mechanical watch</li>
            <li><strong>Water:</strong> Filters, purification tablets, containers</li>
            <li><strong>Food:</strong> High-calorie rations, canned goods, fishing gear</li>
            <li><strong>Shelter:</strong> Tarp, rope, camouflage netting</li>
            <li><strong>Tools:</strong> Multi-tool, knife, hand saw, basic repair kit</li>
            <li><strong>Medical:</strong> First aid supplies, antibiotics, pain relief</li>
            <li><strong>Communication:</strong> Analog radio, signal mirror, whistle</li>
          </ul>

          <h3>Electronics (Faraday Cage Storage)</h3>
          <ul>
            <li>Handheld radio transceiver</li>
            <li>Solar panel and battery pack</li>
            <li>LED flashlights</li>
            <li>Emergency beacon (use sparingly)</li>
          </ul>

          <h3>Weapon & Defense</h3>
          <ul>
            <li>Multi-purpose knife or machete</li>
            <li>Slingshot or bow (quiet weapons)</li>
            <li>Bear spray or pepper deterrent</li>
            <li>Camouflage materials</li>
          </ul>

          <h3>Long-Term Supplies</h3>
          <ul>
            <li>Seeds for food production</li>
            <li>Basic carpentry tools</li>
            <li>Fishing nets and traps</li>
            <li>Water purification chemicals</li>
            <li>Emergency medications</li>
          </ul>
        </article>
      </main>
    </>
  );
};

// Navigation Tutorial Page Component
const NavigationPage = () => {
  const navImages = [
    'assets/kit-photos/compass/compass survival navigation.jpg',
    'assets/kit-photos/map/world-map-dotted.jpg',
    'assets/kit-photos/map/survival map.jpg'
  ];

  return (
    <>
      <BackgroundSlideshow images={navImages} />
      <header className="site-header">
        <div className="wrap">
          <Navigation />
          <h1>Navigation Tutorial</h1>
          <p className="subtitle">Survival navigation without GPS or digital devices</p>
          <p className="byline">By Hazem ElBatawy</p>
        </div>
      </header>

      <main className="wrap">
        <article>
          <h2>Analog Navigation Essentials</h2>
          <p>In a robotic apocalypse, GPS and digital navigation become liabilities. Master these analog techniques for reliable navigation.</p>
          
          <h3>Using a Compass</h3>
          <ul>
            <li>Always calibrate away from metal objects</li>
            <li>Take bearing to prominent landmarks</li>
            <li>Use triangulation with multiple bearings</li>
            <li>Account for magnetic declination</li>
          </ul>

          <h3>Map Reading</h3>
          <ul>
            <li>Topographic maps show terrain elevation</li>
            <li>Contour lines indicate slope and elevation</li>
            <li>Scale determines distance accuracy</li>
            <li>Grid references provide precise locations</li>
          </ul>

          <h3>Natural Navigation</h3>
          <ul>
            <li>Sun rises in east, sets in west</li>
            <li>North Star (Polaris) indicates true north</li>
            <li>Moss typically grows on north side of trees</li>
            <li>Rivers flow toward larger bodies of water</li>
          </ul>

          <h3>Distance Estimation</h3>
          <ul>
            <li>Pace counting: Count steps for known distances</li>
            <li>Time estimation: Average walking speed is 5 km/h</li>
            <li>Landmark triangulation: Use known reference points</li>
            <li>Sound and visibility: Estimate based on environmental cues</li>
          </ul>

          <h3>Emergency Signaling</h3>
          <ul>
            <li>Three of anything signals distress (whistles, fires, reflections)</li>
            <li>Ground signals: Large X for medical emergency, V for assistance needed</li>
            <li>Mirror signals: Flash in groups of three</li>
            <li>Smoke signals: Use only when safe from detection</li>
          </ul>
        </article>
      </main>
    </>
  );
};

// Egypt Map Page Component
const EgyptPage = () => {
  const egyptImages = [
    'assets/kit-photos/map/world-map-dotted.jpg',
    'assets/kit-photos/map/survival map.jpg'
  ];

  return (
    <>
      <BackgroundSlideshow images={egyptImages} />
      <header className="site-header">
        <div className="wrap">
          <Navigation />
          <h1>Egypt Strategic Map</h1>
          <p className="subtitle">Regional survival zones and strategic locations</p>
          <p className="byline">By Hazem ElBatawy</p>
        </div>
      </header>

      <main className="wrap">
        <article>
          <h2>Egypt Survival Zones</h2>
          <p>Strategic analysis of Egypt's geography for survival scenarios, focusing on water access, remote areas, and natural defenses.</p>
          
          <h3>High-Value Survival Areas</h3>
          <ul>
            <li><strong>Sinai Peninsula:</strong> Mountain terrain, limited infrastructure, natural caves</li>
            <li><strong>Western Desert Oases:</strong> Natural water sources, isolation from main population centers</li>
            <li><strong>Upper Nile Valley:</strong> Water access, agricultural potential, traditional communities</li>
            <li><strong>Red Sea Coast:</strong> Fishing opportunities, escape routes by sea</li>
            <li><strong>Eastern Desert:</strong> Mountainous terrain, mining sites for resources</li>
          </ul>

          <h3>Areas to Avoid</h3>
          <ul>
            <li>Cairo metropolitan area (high surveillance, dense population)</li>
            <li>Alexandria (major port, strategic importance)</li>
            <li>Suez Canal zone (critical infrastructure, military presence)</li>
            <li>Major highways and transportation hubs</li>
            <li>Industrial complexes and military installations</li>
            <li>Tourist areas (high monitoring, international attention)</li>
          </ul>

          <h3>Resource Considerations</h3>
          <ul>
            <li><strong>Water Sources:</strong> Nile River, oases, underground aquifers</li>
            <li><strong>Food Production:</strong> Nile Delta (high risk), desert oases (sustainable)</li>
            <li><strong>Natural Shelter:</strong> Caves, rock formations, abandoned structures</li>
            <li><strong>Climate Challenges:</strong> Extreme heat, sandstorms, limited rainfall</li>
          </ul>

          <h3>Strategic Considerations</h3>
          <ul>
            <li>Egypt's position links Africa and Middle East</li>
            <li>Control of Suez Canal makes it high-value target</li>
            <li>Desert terrain offers concealment but harsh conditions</li>
            <li>Ancient infrastructure may provide hidden refuge</li>
          </ul>
        </article>
      </main>
    </>
  );
};

function App() {
  return (
    <Router basename="/Robotic-Resilience-Vite">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/survival-kit" element={<SurvivalKitPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/egypt" element={<EgyptPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
