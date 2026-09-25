'use client';

import { ExperienceTimeline, Heading } from '@darcysm/bastet-ui';
import { useExperienceSection } from './useExperienceSection';

export function ExperienceSection() {
  const { t, experienceItems } = useExperienceSection();

  return (
    <section id="experience" style={{ padding: '24px 24px', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Heading level={2} highlight align="center">
          {t('title')}
        </Heading>


        <ExperienceTimeline items={experienceItems} />
      </div>
    </section>
  );
}
