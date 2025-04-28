import { useCurrentFrame, interpolate } from 'remotion';
import React, { useState, useEffect } from 'react';
import './fonts.css';

export const RemyAIFrame7 = () => {
  const frame = useCurrentFrame();
  
  // Text animation configuration
  const queries = [
    "Biryani under ₹399",
    "Family dinner for 4, all veg",
    "Office lunch under 15 minutes",
    "Kuch bhi..."
  ];

  // Animation timing (at 60fps)
  const typingDuration = 50; // frames for typing (fast but readable)
  const displayDuration = 60; // frames for display (quick but enough to read)
  const deleteDuration = 28; // frames for deletion (faster to match typing)
  const cycleDuration = typingDuration + displayDuration + deleteDuration; // total frames per query

  // Calculate current query and timing
  // For the last query, we'll stop cycling
  const rawIndex = Math.floor(frame / cycleDuration);
  const currentIndex = Math.min(rawIndex, queries.length - 1);
  const nextIndex = Math.min(currentIndex + 1, queries.length - 1);
  const currentQuery = queries[currentIndex];
  const nextQuery = queries[nextIndex];
  
  // Check if we're at the last query
  const isLastQuery = currentIndex === queries.length - 1;
  const lastQueryComplete = isLastQuery && frame >= (queries.length * cycleDuration);

  // Calculate timing
  const cycleFrame = frame % cycleDuration;
  const currentLength = currentQuery.length;
  
  const typingPhase = Math.min(cycleFrame, typingDuration);
  const deleteStart = typingDuration + displayDuration;
  const deletePhase = cycleFrame > deleteStart
    ? Math.min(cycleFrame - deleteStart, deleteDuration)
    : 0;


  // Calculate text with cursor
  let displayText = "";

  if (lastQueryComplete) {
    // If last query is complete, show full text without animation
    displayText = currentQuery;
  } else if (cycleFrame <= typingDuration) {
    // Typing phase
    const progress = typingPhase / typingDuration;
    const charsToShow = Math.floor(progress * currentLength);
    displayText = currentQuery.slice(0, charsToShow);
  } else if (cycleFrame > deleteStart && !isLastQuery) {
    // Delete phase - only if not the last query
    const progress = deletePhase / deleteDuration;
    const charsToKeep = Math.floor(currentLength * (1 - progress));
    displayText = currentQuery.slice(0, Math.max(0, charsToKeep));
  } else {
    // Display phase
    displayText = currentQuery;
  }

  // Calculate when the last query will be fully typed
  const lastQueryStartFrame = (queries.length - 1) * cycleDuration;
  const lastQueryTypingEndFrame = lastQueryStartFrame + typingDuration;
  
  // Click animation timing
  const clickStartFrame = lastQueryTypingEndFrame + 16; // Add a small delay after typing
  const clickDuration = 30; // 1 second for visible animation

  // Check if we're in the final animation phase
  const isInFinalPhase = frame >= clickStartFrame;
  
  // Calculate click progress with simple easing
  const clickProgress = interpolate(
    frame,
    [clickStartFrame, clickStartFrame + clickDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => {
        // Simple cubic easing for smooth animation
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
    }
  );

  // Cursor animation
  const cursorVisible = !isInFinalPhase && Math.floor((frame % 30) / 15);
  
  // Simple scale animation for the click
  const ctaScale = interpolate(
    clickProgress,
    [0, 0.3, 0.6, 1],
    [1, 0.82, 0.82, 1], // Scale down and hold before bouncing back
    { extrapolateRight: 'clamp' }
  );



  return (
    <div style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: '#09090A',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily:'Inter',
      overflow: 'hidden',
    }}>
      {/* Background blur rectangles */}
      <div style={{
        position: 'absolute',
        width: '760px',
        height: '508px',
        left: '50%',
        top: '50%',
        transform: 'translate(-90%, -50%)',
        background: 'rgba(112, 147, 247, 0.12)',
        filter: 'blur(110px)',
        borderRadius: '20px',
      }} />
      <div style={{
        position: 'absolute',
        width: '760px',
        height: '508px',
        left: '50%',
        top: '50%',
        transform: 'translate(-10%, -50%)',
        background: 'rgba(167, 145, 245, 0.12)',
        filter: 'blur(110px)',
        borderRadius: '20px',
      }} />
      {/* Main search container with glass effect */}
      <div style={{
        position: 'relative',
        // background: 'red',
        display: 'flex',
        width: '1020px',      // Increased from 920px
        height: '165px',     // Increased from 124px
        padding: '24px 24px 24px 56px', // Increased padding
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: '190px',
        border: '2px solid rgba(225, 231, 240, 0.16)',
        background: 'rgba(31, 31, 31, 0.80)',
      }}>
        <div style={{ flex: 1 }}>
          {/* Search text with typing animation */}
          <span style={{
            fontSize: '54px',  // Increased from 3.2rem
            fontWeight: 400,
            color: 'white',
            whiteSpace: 'pre',
            letterSpacing: '0',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
            display: 'inline-block',
            textAlign: 'left',
          }}>
            <span>{displayText}</span>
            <span style={{ 
              color: '#6e9fff',
              opacity: cursorVisible ? 1 : 0,
              transition: 'opacity 0.1s ease',
            }}>|</span>
          </span>
        </div>

        {/* CTA button container */}
        <div style={{
          position: 'relative',
          width: '112px',  // Increased from 84px
          height: '112px', // Increased from 84px
          flexShrink: 0,
        }}>
          <button style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #527BF0 0%, #A791F5 100%)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: `scale(${ctaScale})`,
          }}
          // No onClick needed in Remotion
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="50" viewBox="0 0 30 34" fill="none">
                <g clip-path="url(#clip0_13195_21455)">
                  <path d="M15 30.582V3.64062" stroke="#1F1F1F" stroke-width="4.75" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3.97852 14.6621L15 3.64062L26.0215 14.6621" stroke="#1F1F1F" stroke-width="4.75" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_13195_21455">
                    <rect width="28.5" height="33.8438" fill="white" transform="translate(0.75 0.078125)"/>
                  </clipPath>
                </defs>
              </svg>
          </button>

          {/* No overlay needed for minimal animation */}
        </div>

      </div>
    </div>
  );
};
