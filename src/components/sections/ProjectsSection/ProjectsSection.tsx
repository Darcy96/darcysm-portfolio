'use client';

// Opcionalmente podrías usar next-intl aquí:
// import { useTranslations } from 'next-intl';

export function ProjectsSection() {
  // const t = useTranslations('Projects');

  return (
    <section id="projects" style={{ padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Mis Proyectos</h2>
      <p style={{ color: 'var(--bst-text-secondary)', marginBottom: '48px', fontSize: '1.125rem' }}>
        Aquí puedes ver algunos de mis trabajos más recientes.
      </p>

      {/* Placeholder Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bst-floating-card"
            style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <p style={{ opacity: 0.5 }}>Project {i} Placeholder</p>
          </div>
        ))}
      </div>
    </section>
  );
}
