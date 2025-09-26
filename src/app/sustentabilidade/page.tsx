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
import SocialClimateSection from '@/components/custom/SocialClimateSection';
import SocialHowWeActSection from '@/components/custom/SocialHowWeActSection';
import SocialEASGSection from '@/components/custom/SocialEASGSection';
import SocialFleetSection from '@/components/custom/SocialFleetSection';
import SocialInnovationSection from '@/components/custom/SocialInnovationSection';
import SocialCommitmentSection from '@/components/custom/SocialCommitmentSection';
import SocialInitiativesSection from '@/components/custom/SocialInitiativesSection';
import GovernanceClimateSection from '@/components/custom/GovernanceClimateSection';
import GovernanceHowWeActSection from '@/components/custom/GovernanceHowWeActSection';
import GovernanceEASGSection from '@/components/custom/GovernanceEASGSection';
import GovernanceFleetSection from '@/components/custom/GovernanceFleetSection';
import GovernanceInnovationSection from '@/components/custom/GovernanceInnovationSection';
import GovernanceCommitmentSection from '@/components/custom/GovernanceCommitmentSection';
import GovernanceInitiativesSection from '@/components/custom/GovernanceInitiativesSection';
import InnovationClimateSection from '@/components/custom/InnovationClimateSection';
import InnovationHowWeActSection from '@/components/custom/InnovationHowWeActSection';
import InnovationEASGSection from '@/components/custom/InnovationEASGSection';
import InnovationFleetSection from '@/components/custom/InnovationFleetSection';
import InnovationCommitmentSection from '@/components/custom/InnovationCommitmentSection';

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
      {selectedTab === "SOCIAL" && (
        <>
          <SocialClimateSection />
          <SocialHowWeActSection />
          <SocialEASGSection />
          <SocialFleetSection />
          <SocialCommitmentSection />
          <SocialInnovationSection />
          <SocialInitiativesSection />
          <SocialSection />
        </>
      )}
      {selectedTab === "GOVERNANÇA" && (
        <>
          <GovernanceClimateSection />
          <GovernanceHowWeActSection />
          <GovernanceEASGSection />
          <GovernanceFleetSection />
          <GovernanceCommitmentSection />
          <GovernanceInnovationSection />
          <GovernanceInitiativesSection />
          <GovernanceSection />
        </>
      )}
      {selectedTab === "INOVAÇÕES" && (
        <>
          <InnovationClimateSection />
          <InnovationHowWeActSection />
          <InnovationEASGSection />
          <InnovationFleetSection />
          <InnovationCommitmentSection />
          <InovacoesSection />
        </>
      )}
      <Footer />
    </main>
  );
}