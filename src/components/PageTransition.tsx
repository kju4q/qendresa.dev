"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PageTransitionProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ href, children, className = '' }: PageTransitionProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Start transition
    setIsTransitioning(true);
    
    // After animation completes, navigate to the destination
    setTimeout(() => {
      router.push(href);
    }, 500); // Match this to the CSS transition duration
  };
  
  useEffect(() => {
    // Add transition styles to the document
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }
      
      .page-transition-exit {
        animation: fadeOut 500ms ease-in-out forwards;
        pointer-events: none;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
