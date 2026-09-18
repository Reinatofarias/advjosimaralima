import React from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/sections/Hero/Hero';
import { Services } from '@/components/sections/Services/Services';
import { WhyAnalysis } from '@/components/sections/WhyAnalysis/WhyAnalysis';
import { AboutJosimara } from '@/components/sections/AboutJosimara/AboutJosimara';
import { FAQ } from '@/components/sections/FAQ/FAQ';
import { UtmInitializer } from '@/components/analytics/UtmInitializer';

export default function Home() {
  return (
    <>
      <UtmInitializer />
      <Header />
      <main id="main-content">
        {/* SEÇÃO 01 — HERO */}
        <Hero />

        {/* SEÇÃO 02 — SITUAÇÕES / SERVIÇOS */}
        <Services />

        {/* SEÇÃO 03 — POR QUE UMA ANÁLISE INDIVIDUAL É IMPORTANTE */}
        <WhyAnalysis />

        {/* SEÇÃO 04 — DRA. JOSIMARA LIMA */}
        <AboutJosimara />

        {/* SEÇÃO 05 — FAQ + CTA FINAL */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
