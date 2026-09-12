import React from 'react';

export default function AnnouncementBar() {
  const items = [
    "FREE EXPRESS SHIPPING ON ORDERS OVER ₹2,999",
    "DROP 01: HEAVYWEIGHT 480 GSM ESSENTIALS LIVE NOW",
    "USE CODE 'VANYARA10' FOR 10% OFF YOUR FIRST ORDER",
    "LIMITED ATELIER PRODUCTION — CUT IN SMALL BATCHES",
    "HONEST PRICING • BUILT TO OUTLAST THE SEASON"
  ];

  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div className="ticker-wrap">
        {[...items, ...items].map((text, idx) => (
          <span key={idx} className="ticker-item">
            <span>{text}</span>
            <span className="ticker-dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
