'use client';

// Opcionalmente podrías usar next-intl aquí:
// import { useTranslations } from 'next-intl';

import { Heading, Text } from '@darcysm/bastet-ui';

export function ProjectsSection() {
  // const t = useTranslations('Projects');

  return (
    <section id="projects" style={{ padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <Heading level={2} highlight>Mis Proyectos</Heading>
      <Text variant="secondary" size="lg" style={{ marginBottom: '48px' }}>
        Aquí puedes ver algunos de mis trabajos más recientes.
      </Text>

      {/* Placeholder Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bst-floating-card"
            style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Text variant="secondary" align="center" style={{ margin: 0 }}>Project {i} Placeholder</Text>
          </div>
        ))}
      </div>
    </section>
  );
}
