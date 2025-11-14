import React from 'react';

export default function TweetEmbed({ html, tweetUrl }) {
  // Hardcoded test HTML to debug rendering issues
  const testHtml = `<blockquote><p>Test tweet embed content.</p><a href="${tweetUrl}">View tweet</a></blockquote>`;
  return (
    <div
      className="tweet-embed"
      aria-label="Embedded tweet"
      dangerouslySetInnerHTML={{
        __html: testHtml
      }}
    />
  );
}
