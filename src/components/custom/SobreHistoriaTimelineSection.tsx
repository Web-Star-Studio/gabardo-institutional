'use client';

import dynamic from 'next/dynamic';

const AboutStorySection = dynamic(() => import('@/components/custom/AboutStorySection'), {
  ssr: false,
});

const SobreHistoriaTimelineSection = () => {
  return <AboutStorySection />;
};

export default SobreHistoriaTimelineSection;
