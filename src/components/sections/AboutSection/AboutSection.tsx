'use client';

export function AboutSection() {
  return (
    <section id="about" style={{ padding: '40px 24px 80px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Sobre mí</h2>
      <p style={{ color: 'var(--bst-text-secondary)', fontSize: '1.125rem', lineHeight: 1.8 }}>
        Soy un desarrollador Frontend apasionado por crear interfaces accesibles, rápidas y con un diseño impecable.
        Me encanta experimentar con nuevas tecnologías y construir sistemas de diseño escalables.
      </p>
    </section>
  );
}
