import CallToAction from "../components/home/CallToAction";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Navbar from "../components/home/Navbar";
import Roles from "../components/home/Roles";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks/>
      <Roles />
      <CallToAction/>
      <Footer/>
    </main>
  );
}
