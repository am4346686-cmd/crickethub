import { Github, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="border-t border-border bg-card mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏏</span>
              <span className="font-bold text-lg">
                <span className="text-primary">Cricket</span>
                <span className="text-foreground">Hub</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your ultimate destination for live cricket scores, match
              schedules, player stats, and breaking news.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Live Scores",
                "Match Schedule",
                "Points Table",
                "Player Stats",
                "Latest News",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="/"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-ocid="footer.link"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
                { icon: Instagram, label: "Instagram" },
                { icon: Github, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="/"
                  aria-label={label}
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Get real-time updates on scores, news, and exclusive content.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            CricketHub — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
