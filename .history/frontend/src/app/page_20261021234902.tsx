import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";



export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features/>
    </main>
  );
}
