```tsx
import Navbar from "@/src/components/home/Navbar";
import Hero from "@/src/components/home/Hero";
import Features from "@/src/components/home/Features";
import HowItWorks from "@/src/components/home/HowItWorks";
import Roles from "@/src/components/home/Roles";
import CallToAction from "@/src/components/home/CallToAction";
import Footer from "@/src/components/home/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Roles />
      <CallToAction />
      <Footer />
    </main>
  );
}
