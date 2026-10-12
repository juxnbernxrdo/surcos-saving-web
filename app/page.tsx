import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { DailySavingsSection } from '@/components/sections/DailySavingsSection';
import { SavingsCalculatorSection } from '@/components/sections/SavingsCalculatorSection';
import { SavingsChallengesSection } from '@/components/sections/SavingsChallengesSection';
import { InspiringStoriesSection } from '@/components/sections/InspiringStoriesSection';
import { EntrepreneurshipSection } from '@/components/sections/EntrepreneurshipSection';
import { TrainingSection } from '@/components/sections/TrainingSection';
import { CeoSection } from '@/components/sections/CeoSection';
import { FutureRoadmapSection } from '@/components/sections/FutureRoadmapSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-[var(--white)] text-[var(--text-1)]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <DailySavingsSection />
        <SavingsCalculatorSection />
        <SavingsChallengesSection />
        <InspiringStoriesSection />
        <EntrepreneurshipSection />
        <TrainingSection />
        <CeoSection />
        <FutureRoadmapSection />
      </main>
      <Footer />
    </div>
  );
}
