import React from 'react';
import { SERVICES_LIST } from '@/config/services';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './Services.module.css';

export const Services: React.FC = () => {
  return (
    <section className={styles.servicesSection} aria-labelledby="services-heading">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.categoryBadge}>Áreas de Atuação</span>
          <h2 id="services-heading" className={styles.title}>
            Em qual dessas situações você se encontra?
          </h2>
          <p className={styles.subtitle}>
            Selecione o assunto mais próximo da sua realidade. Cada pedido exige comprovações e caminhos específicos perante a Previdência Social.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES_LIST.map((service) => (
            <article key={service.id} className={styles.card}>
              {service.badge && <span className={styles.cardBadge}>{service.badge}</span>}
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.shortDescription}</p>
              
              <div className={styles.cardFooter}>
                <CTAButton
                  origin={`service_${service.id}`}
                  service={service.id}
                  variant="outline"
                  size="sm"
                  fullWidth
                >
                  {service.ctaText}
                </CTAButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
