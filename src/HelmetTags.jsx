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
    <meta property="og:title" content="Robotic Resilience – Survival Strategy Framework & Guides" />
    <meta property="og:description" content="Comprehensive survival strategy framework, guides, and resources for resilience in a robotic apocalypse." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://zoma00.github.io/Robotic-Resilience-React/" />
    <meta property="og:image" content="https://zoma00.github.io/Robotic-Resilience-React/assets/favicon.svg" />
  </Helmet>
);

// Survival Kit Page Helmet
export const SurvivalKitHelmet = (
  <Helmet>
    <title>War Survival Kit – Robotic Resilience</title>
    <meta name="description" content="Essential gear and supplies for emergency preparedness in a robotic apocalypse. Discover analog tools, self-sufficiency strategies, and long-term survival essentials." />
    <link rel="canonical" href="https://zoma00.github.io/Robotic-Resilience-React/survival-kit" />
    <meta property="og:title" content="War Survival Kit – Robotic Resilience" />
    <meta property="og:description" content="Essential gear and supplies for emergency preparedness in a robotic apocalypse. Discover analog tools, self-sufficiency strategies, and long-term survival essentials." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://zoma00.github.io/Robotic-Resilience-React/survival-kit" />
    <meta property="og:image" content="https://zoma00.github.io/Robotic-Resilience-React/assets/favicon.svg" />
  </Helmet>
);

// Navigation Page Helmet
export const NavigationHelmet = (
  <Helmet>
    <title>Navigation Tutorial – Robotic Resilience</title>
    <meta name="description" content="Survival navigation without GPS or digital devices. Master analog techniques for reliable orientation and emergency signaling in a robotic apocalypse." />
    <link rel="canonical" href="https://zoma00.github.io/Robotic-Resilience-React/navigation" />
    <meta property="og:title" content="Navigation Tutorial – Robotic Resilience" />
    <meta property="og:description" content="Survival navigation without GPS or digital devices. Master analog techniques for reliable orientation and emergency signaling in a robotic apocalypse." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://zoma00.github.io/Robotic-Resilience-React/navigation" />
    <meta property="og:image" content="https://zoma00.github.io/Robotic-Resilience-React/assets/favicon.svg" />
  </Helmet>
);

// Egypt Page Helmet
export const EgyptHelmet = (
  <Helmet>
    <title>Egypt Survival Zones – Robotic Resilience</title>
    <meta name="description" content="Strategic analysis of Egypt's geography for survival scenarios, focusing on water access, remote areas, and natural defenses." />
    <link rel="canonical" href="https://zoma00.github.io/Robotic-Resilience-React/egypt" />
    <meta property="og:title" content="Egypt Survival Zones – Robotic Resilience" />
    <meta property="og:description" content="Strategic analysis of Egypt's geography for survival scenarios, focusing on water access, remote areas, and natural defenses." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://zoma00.github.io/Robotic-Resilience-React/egypt" />
    <meta property="og:image" content="https://zoma00.github.io/Robotic-Resilience-React/assets/favicon.svg" />
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
