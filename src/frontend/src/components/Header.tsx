import { Button } from "@/components/ui/button";
import { LogIn, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  "Home",
  "Scores",
  "Schedule",
  "Standings",
  "Players",
  "News",
];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2" data-ocid="header.link">
            <span className="text-2xl">🏏</span>
            <span className="font-bold text-lg">
              <span className="text-primary">Cricket</span>
              <span className="text-foreground">Hub</span>
            </span>
          </div>

          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav.link"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => setActive(link)}
                data-ocid="nav.tab"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active === link
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              data-ocid="header.search_input"
            >
              <Search className="w-4 h-4" />
            </button>
            <Button
              size="sm"
              variant="outline"
              className="hidden md:flex gap-1.5 border-primary/40 text-primary hover:bg-primary/10"
              data-ocid="header.primary_button"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login
            </Button>
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="header.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden border-t border-border bg-card"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link}
                  onClick={() => {
                    setActive(link);
                    setMobileOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                    active === link
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {link}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
