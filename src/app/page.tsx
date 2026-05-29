import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResumeOptimizer from "@/components/ResumeOptimizer";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ResumeOptimizer />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
