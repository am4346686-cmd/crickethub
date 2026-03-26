import { Button } from "@/components/ui/button";
import { Play, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.01 255) 0%, oklch(0.18 0.02 255) 40%, oklch(0.15 0.03 142) 100%)",
        minHeight: "480px",
      }}
    >
      {/* Diagonal green stripe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 55%, oklch(0.77 0.18 142 / 0.12) 55%, oklch(0.77 0.18 142 / 0.06) 75%, transparent 75%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.77 0.18 142) 0px, oklch(0.77 0.18 142) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, oklch(0.77 0.18 142) 0px, oklch(0.77 0.18 142) 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center gap-10">
        {/* Left Text */}
        <motion.div
          className="flex-1 text-left"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">
            🏏 Live Cricket Coverage
          </p>
          <h1 className="font-bold leading-tight mb-4">
            <span className="block text-primary text-5xl sm:text-6xl">
              Your Ultimate
            </span>
            <span className="block text-foreground text-5xl sm:text-6xl">
              Cricket Hub
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Live scores, match schedules, player statistics, and breaking news —
            all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-foreground text-background font-bold hover:bg-foreground/90 gap-2"
              data-ocid="hero.primary_button"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Live
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 gap-2"
              data-ocid="hero.secondary_button"
            >
              <TrendingUp className="w-4 h-4" />
              View Standings
            </Button>
          </div>
        </motion.div>

        {/* Right — player / stats panel */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div
            className="text-8xl select-none drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 0 32px oklch(0.77 0.18 142 / 0.5))",
            }}
          >
            🏏
          </div>
          <div className="flex gap-6 mt-2">
            {[
              { label: "Live Matches", value: "6" },
              { label: "Teams", value: "32" },
              { label: "Players", value: "480+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
