import { Navbar, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { KpiBar } from './components/KpiBar';
import { YearlyChart } from './components/YearlyChart';
import { SeasonalityAndStates } from './components/SeasonalityAndStates';
import { ModelResults } from './components/ModelResults';
import { ForecastChart } from './components/ForecastChart';
import { Methodology } from './components/Methodology';
import { Improvements } from './components/Improvements';

export default function App() {
  return (
    <div className="min-h-screen bg-amazon-900">
      <Navbar />
      <Hero />
      <KpiBar />
      <YearlyChart />
      <SeasonalityAndStates />
      <ModelResults />
      <ForecastChart />
      <Methodology />
      <Improvements />
      <Footer />
    </div>
  );
}
