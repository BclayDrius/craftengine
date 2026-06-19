import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CostOfFailure from "@/components/CostOfFailure";
import MaturityModel from "@/components/MaturityModel";
import PlatformPipeline from "@/components/PlatformPipeline";
import Capabilities from "@/components/Capabilities";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import Dashboard from "@/components/Dashboard";
import Integrations from "@/components/Integrations";
import KPIs from "@/components/KPIs";
import TechStack from "@/components/TechStack";
import ReadinessScore from "@/components/ReadinessScore";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CostOfFailure />
        <MaturityModel />
        <PlatformPipeline />
        <Capabilities />
        <HowItWorks />
        <Roadmap />
        <Dashboard />
        <Integrations />
        <KPIs />
        <TechStack />
        <ReadinessScore />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
