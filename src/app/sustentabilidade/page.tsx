'use client';
import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import NewSustainabilityHeroSection from '@/components/custom/NewSustainabilityHeroSection';
import ClimateChangeSection from '@/components/custom/ClimateChangeSection';
import HowWeActSection from '@/components/custom/HowWeActSection';
import EASGSection from '@/components/custom/EASGSection';
import FleetSection from '@/components/custom/FleetSection';
import MaxAgeSection from '@/components/custom/MaxAgeSection';
import InnovativeSolutionsSection from '@/components/custom/InnovativeSolutionsSection';
import InitiativesSection from '@/components/custom/InitiativesSection';
import SocialSection from '@/components/custom/SocialSection';
import GovernanceSection from '@/components/custom/GovernanceSection';
import InovacoesSection from '@/components/custom/InovacoesSection';

export default function SustentabilidadePage() {
  const [selectedTab, setSelectedTab] = useState("AMBIENTAL");

  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <NewSustainabilityHeroSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "AMBIENTAL" && (
        <>
          <ClimateChangeSection />
          <HowWeActSection />
          <EASGSection />
          <FleetSection />
          <MaxAgeSection />
          <InnovativeSolutionsSection />
          <InitiativesSection />
        </>
      )}
      {selectedTab === "SOCIAL" && <SocialSection />}
      {selectedTab === "GOVERNANÇA" && <GovernanceSection />}
      {selectedTab === "INOVAÇÕES" && <InovacoesSection />}
      <Footer />
    </main>
  );
}