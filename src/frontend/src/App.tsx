import { motion } from "motion/react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IplTeams from "./components/IplTeams";
import LiveMatches from "./components/LiveMatches";
import MatchSchedule from "./components/MatchSchedule";
import PointsTableAndStats from "./components/PointsTableAndStats";
import RecentNews from "./components/RecentNews";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            <LiveMatches />
            <IplTeams />
            <MatchSchedule />
            <RecentNews />
            <PointsTableAndStats />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
