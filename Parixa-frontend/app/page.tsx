import { HeroSection } from "./sections/hero-section";
import { FeaturesSection } from "./sections/features-section";
import { HowItWorksSection } from "./sections/how-it-works-section";
import { SubjectsSection } from "./sections/subjects-section";
import { Footer } from "./sections/footer";
import Navbar from "@/components/shared/Navbar";

// Add a basic structure for the landing page
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SubjectsSection />
      <Footer />

    </div>
  );
}
