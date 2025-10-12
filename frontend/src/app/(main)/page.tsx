import { HeroSection } from '@/components/features/home/HeroSection';
import { AboutSection } from '@/components/features/home/AboutSection';
import { ProgramsSection } from '@/components/features/home/ProgramsSection';
import { NoticesSection } from '@/components/features/home/NoticesSection';
import { CallToActionSection } from '@/components/features/home/CallToActionSection';

export default function MainPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <NoticesSection />
      <CallToActionSection />
    </>
  );
}
