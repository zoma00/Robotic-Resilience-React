import React, { useEffect, useRef } from 'react';

export default function TweetEmbed({ html, tweetUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = html || `<blockquote><a href="${tweetUrl}">View tweet</a></blockquote>`;

    // lazy load widgets.js (only once)
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    } else {
      // re-parse if twttr already exists
      window.twttr.widgets?.load(containerRef.current);
    }
  }, [html, tweetUrl]);

  return (
    <div
      ref={containerRef}
      className="tweet-embed"
      aria-label="Embedded tweet"
    />
  );
}
