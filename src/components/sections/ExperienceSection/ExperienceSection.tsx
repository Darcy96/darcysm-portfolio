'use client';

import { useTranslations } from 'next-intl';
import { HorizontalExperience, type ExperienceItem } from '@darcysm/bastet-ui';

export function ExperienceSection() {
  const t = useTranslations('Experience');

  const experienceItems: ExperienceItem[] = [
    {
      id: 1,
      date: t('dacodes.date'),
      role: t('dacodes.role'),
      company: t('dacodes.company'),
      location: t('dacodes.location'),
      stack: ['Next.js 14', 'TypeScript', 'React Query', 'GraphQL', 'Ant Design'],
      // We can use t.raw if next-intl is configured for arrays,
      // or we can just fetch the raw array. Assuming t.raw is available.
      detailedDescription: t.raw('dacodes.achievements'),
    },
    {
      id: 2,
      date: t('fortex.date'),
      role: t('fortex.role'),
      company: t('fortex.company'),
      location: t('fortex.location'),
      stack: ['Next.js', 'TypeScript', 'Atomic Design', 'Jotai', 'Material UI'],
      detailedDescription: t.raw('fortex.achievements'),
    },
    {
      id: 3,
      date: t('avanti.date'),
      role: t('avanti.role'),
      company: t('avanti.company'),
      location: t('avanti.location'),
      stack: ['React.js', 'Redux Saga', 'Node.js', 'Dialogflow'],
      detailedDescription: t.raw('avanti.achievements'),
    },
  ];

  return (
    <section id="experience" style={{ padding: '24px 24px', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center' }}>
          {t('title')}
        </h2>


        <HorizontalExperience items={experienceItems} />
      </div>
    </section>
  );
}
