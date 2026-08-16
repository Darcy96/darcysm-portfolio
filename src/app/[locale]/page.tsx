'use client';

import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection/AboutSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--bst-border)', margin: '40px 0' }} />

      <ExperienceSection />

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--bst-border)', margin: '20px 0' }} />


    </>
  );
}
