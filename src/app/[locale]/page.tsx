'use client';

import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection/AboutSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--bst-border)', margin: '40px 0' }} />
      
      <ProjectsSection />
      
      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--bst-border)', margin: '40px 0' }} />

      <AboutSection />
    </>
  );
}
