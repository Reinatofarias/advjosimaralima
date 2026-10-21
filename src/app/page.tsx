import React from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Hero } from '@/components/sections/Hero/Hero';
import { Services } from '@/components/sections/Services/Services';
import { MaternityReality } from '@/components/sections/MaternityReality/MaternityReality';
import { OtherRights } from '@/components/sections/OtherRights/OtherRights';
import { WhyAnalysis } from '@/components/sections/WhyAnalysis/WhyAnalysis';
import { AboutJosimara } from '@/components/sections/AboutJosimara/AboutJosimara';
import { FAQ } from '@/components/sections/FAQ/FAQ';
import { UtmInitializer } from '@/components/analytics/UtmInitializer';
import { ScrollHistory } from '@/components/ui/ScrollHistory/ScrollHistory';

export default function Home() {
  return (
    <>
      <UtmInitializer />
      <Header />
      <ScrollHistory />
      <main id="main-content">
        {/* SEÇÃO 01 — HERO */}
        <Hero />

        {/* SEÇÃO 02 — NÃO É BOLSA FAMÍLIA + POR QUE AS MÃES PERDEM O DIREITO */}
        <MaternityReality />

        {/* SEÇÃO 03 — QUEM PODE TER DIREITO */}
        <Services />

        {/* SEÇÃO 04 — COMO FUNCIONA */}
        <WhyAnalysis />

        {/* SEÇÃO 05 — OUTROS DIREITOS DA MULHER */}
        <OtherRights />

        {/* SEÇÃO 06 — DRA. JOSIMARA LIMA */}
        <AboutJosimara />

        {/* SEÇÃO 07 — FAQ + CTA FINAL */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
