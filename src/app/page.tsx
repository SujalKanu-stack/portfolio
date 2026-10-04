import ClientShell from "@/components/ClientShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <ClientShell>
      <Hero />
      <About />
      <Projects />
      <Journey />
      <Contact />
    </ClientShell>
  );
}
