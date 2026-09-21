'use client';

import React, { useEffect, useState } from 'react';
import styles from './ScrollHistory.module.css';

const SECTIONS = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'analise', label: 'Análise' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'duvidas', label: 'Dúvidas' },
];

export const ScrollHistory: React.FC = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
      const readPoint = scrollTop + window.innerHeight * 0.38;

      const current = SECTIONS.reduce((nearest, section) => {
        const element = document.getElementById(section.id);
        if (!element) return nearest;

        return element.offsetTop <= readPoint ? section.id : nearest;
      }, SECTIONS[0].id);

      setProgress(nextProgress);
      setActiveId(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={styles.history} aria-label="Progresso da página">
      <div className={styles.track} aria-hidden="true">
        <span className={styles.trackFill} style={{ transform: `scaleY(${progress})` }} />
      </div>

      <ol className={styles.list}>
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id} className={styles.item}>
              <a
                href={`#${section.id}`}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => handleClick(event, section.id)}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.label}>{section.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
