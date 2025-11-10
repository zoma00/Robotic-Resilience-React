// SEO-optimized Helmet tags for all main pages
// Usage: Place the relevant <Helmet> block at the top of each page component
// Requires: npm install react-helmet-async
import { Helmet } from 'react-helmet-async';

// HomePage Helmet
export const HomeHelmet = (
  <Helmet>
    <title>Robotic Resilience-Human Continuity Blueprint</title>
    <meta name="description" content="Robotic Resilience is a comprehensive survival strategy framework and guide for human continuity in a robotic apocalypse. Learn practical, psychological, and strategic survival for small human enclaves." />
    <link rel="canonical" href="https://zoma00.github.io/Robotic-Resilience-React/" />
  </Helmet>
);

// Survival Kit Page Helmet
export const SurvivalKitHelmet = (
  <Helmet>
    <title>War Survival Kit – Robotic Resilience</title>
    <meta name="description" content="Essential gear and supplies for emergency preparedness in a robotic apocalypse. Discover analog tools, self-sufficiency strategies, and long-term survival essentials." />
    <link rel="canonical" href="https://zoma00.github.io/Robotic-Resilience-React/survival-kit" />
  </Helmet>
);

// Navigation Page Helmet
export const NavigationHelmet = (
  <Helmet>
    <title>Navigation Tutorial – Robotic Resilience</title>
    <meta name="description" content="Survival navigation without GPS or digital devices. Master analog techniques for reliable orientation and emergency signaling in a robotic apocalypse." />
    <link rel="canonical" href="https://zoma00.github.io/Robotic-Resilience-React/navigation" />
  </Helmet>
);

// Egypt Page Helmet
export const EgyptHelmet = (
  <Helmet>
    <title>Egypt Survival Zones – Robotic Resilience</title>
    <meta name="description" content="Strategic analysis of Egypt's geography for survival scenarios, focusing on water access, remote areas, and natural defenses." />
    <link rel="canonical" href="https://zoma00.github.io/Robotic-Resilience-React/egypt" />
  </Helmet>
);

// Usage Example:
// import { Helmet } from 'react-helmet-async';
// import { HomeHelmet } from './Tips/SEO/HelmetTags';
// ...
// function HomePage() {
//   return (
//     <>
//       {HomeHelmet}
//       ...rest of page...
//     </>
//   );
// }
