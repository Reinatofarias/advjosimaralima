import React from 'react';
import { SERVICES_LIST } from '@/config/services';
import { CTAButton } from '@/components/ui/CTAButton/CTAButton';
import styles from './Services.module.css';

export const Services: React.FC = () => {
  return (
    <section id="servicos" className={styles.servicesSection} aria-labelledby="services-heading">
      <div className="container">
        <div className={styles.header}>
          <h2 id="services-heading" className={styles.title}>
            Se você se encaixa em um destes, vale a pena olhar.
          </h2>
          <p className={styles.subtitle}>
            Toque na situação mais parecida com a sua. Cada caso tem regras e documentos próprios, e é isso que a Dra. Josimara confere para você.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES_LIST.map((service) => (
            <article
              key={service.id}
              id={service.id.replaceAll('_', '-')}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>
              <p className={styles.cardDesc}>{service.shortDescription}</p>
              
              <div className={styles.cardFooter}>
                <CTAButton
                  origin={`service_${service.id}`}
                  service={service.service}
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
