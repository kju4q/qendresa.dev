"use client";

import { ReactNode, useEffect, useState } from 'react';
import Layout from './Layout';

type TransitionLayoutProps = {
  children: ReactNode;
  variant?: "default" | "article" | "wide";
};

export default function TransitionLayout({ children, variant = "default" }: TransitionLayoutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Cleanup function for exit animation
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <Layout variant={variant}>
      <div
        className={`transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </Layout>
  );
}
