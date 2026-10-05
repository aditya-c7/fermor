import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ShiftSection from "@/components/ShiftSection";
import CalculatorIndex from "@/components/CalculatorIndex";
import ForecastSection from "@/components/ForecastSection";
import { FermorExchangeCta } from "@/components/FermorExchangeCta";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <Nav />
      <main id="main" tabIndex={-1} className="flex flex-col flex-1 outline-none min-w-0">
        <Hero />
        <ProblemSection />
        <ShiftSection />
        <CalculatorIndex />
        <ForecastSection />
        <FermorExchangeCta />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
