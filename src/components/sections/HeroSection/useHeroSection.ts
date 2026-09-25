import { useTranslations } from 'next-intl';

export function useHeroSection() {
  const t = useTranslations('Hero');

  const handleScrollToExperience = () => {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return {
    t,
    handleScrollToExperience,
    handleScrollToContact,
  };
}
