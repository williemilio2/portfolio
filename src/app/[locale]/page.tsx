import { ActiveSectionProvider } from "@/components/layout/ActiveSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollTrace } from "@/components/layout/Trace";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";

export default function HomePage() {
  return (
    <ActiveSectionProvider>
      <Header />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <ScrollTrace />
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ActiveSectionProvider>
  );
}
