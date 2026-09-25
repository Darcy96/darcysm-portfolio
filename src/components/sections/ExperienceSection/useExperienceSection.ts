import { useTranslations } from 'next-intl';
import type { ExperienceItem } from '@darcysm/bastet-ui';

export function useExperienceSection() {
  const t = useTranslations('Experience');

  const experienceItems: ExperienceItem[] = [
    {
      id: 1,
      date: t('dacodes.date'),
      role: t('dacodes.role'),
      company: t('dacodes.company'),
      location: t('dacodes.location'),
      stack: ['Next.js 14', 'TypeScript', 'React Query', 'GraphQL', 'Ant Design'],
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

  return {
    t,
    experienceItems,
  };
}
