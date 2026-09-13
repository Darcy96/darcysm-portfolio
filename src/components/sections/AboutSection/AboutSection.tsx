'use client';
import { Heading, Text } from '@darcysm/bastet-ui';
export function AboutSection() {
  return (
    <section id="about" style={{ padding: '40px 24px 80px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <Heading level={2} highlight align="center">Sobre mí</Heading>
      <Text variant="secondary" size="lg">
        Soy un desarrollador Frontend apasionado por crear interfaces accesibles, rápidas y con un diseño impecable.
        Me encanta experimentar con nuevas tecnologías y construir sistemas de diseño escalables.
      </Text>
    </section>
  );
}
