import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AIChatSection from "../components/ai/AIChatSection";
import HeroSection from "../components/sections/HeroSection";
import BiographySection from "../components/sections/BiographySection";
import TimelineSection from "../components/sections/TimelineSection";
import JourneySection from "../components/sections/JourneySection";
import PhilosophySection from "../components/sections/PhilosophySection";
import MindMapSection from "../components/mindmap/MindMapSection";
import CareerSection from "../components/sections/CareerSection";
import IdeologySection from "../components/sections/IdeologySection";
import WorksSection from "../components/sections/WorksSection";
import GallerySection from "../components/sections/GallerySection";
import QuoteSection from "../components/sections/QuoteSection";
import QuizSection from "../components/quiz/QuizSection";
import LegacySection from "../components/sections/LegacySection";
import ContributionRadarSection from "../components/sections/ContributionRadarSection";
import BackToTop from "../components/common/BackToTop";
import ToolSupportSection from "../components/sections/ToolSupportSection";
import AIChatBubble from "../components/ai/AIChatBubble";
function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f1e5] text-stone-800">
      <Header />

      <main>
        <HeroSection />
        <BiographySection />
        <TimelineSection />
        <JourneySection />
        <PhilosophySection />
        <MindMapSection />
        <AIChatSection />
        <CareerSection />
        <IdeologySection />
        <WorksSection />
        <GallerySection />
        <QuoteSection />
        <QuizSection />
        <LegacySection />
        <ContributionRadarSection />
        <ToolSupportSection />
      </main>

      <Footer />
      <BackToTop />
      <AIChatBubble />
    </div>
  );
}

export default HomePage;
