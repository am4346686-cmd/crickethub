import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin } from "lucide-react";
import { MatchStatus } from "../backend.d";
import type { CricketMatch } from "../backend.d";
import { useAllMatches } from "../hooks/useQueries";

const FALLBACK: CricketMatch[] = [
  {
    id: "s1",
    matchType: "test" as any,
    status: "upcoming" as any,
    result: "",
    venue: "MCG, Melbourne",
    homeTeam: { flagEmoji: "🇦🇺", name: "Australia", countryCode: "AUS" },
    awayTeam: { flagEmoji: "🇿🇦", name: "South Africa", countryCode: "SA" },
    date: BigInt(Date.now() + 86400000),
    tournament: "ICC Test Championship",
    homeScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
    awayScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
  },
  {
    id: "s2",
    matchType: "t20" as any,
    status: "upcoming" as any,
    result: "",
    venue: "Wankhede Stadium, Mumbai",
    homeTeam: { flagEmoji: "🇮🇳", name: "India", countryCode: "IND" },
    awayTeam: { flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "England", countryCode: "ENG" },
    date: BigInt(Date.now() + 172800000),
    tournament: "Asia Cup T20",
    homeScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
    awayScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
  },
  {
    id: "s3",
    matchType: "odi" as any,
    status: "upcoming" as any,
    result: "",
    venue: "National Stadium, Karachi",
    homeTeam: { flagEmoji: "🇵🇰", name: "Pakistan", countryCode: "PAK" },
    awayTeam: { flagEmoji: "🇳🇿", name: "New Zealand", countryCode: "NZ" },
    date: BigInt(Date.now() + 259200000),
    tournament: "ODI World Cup Qualifier",
    homeScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
    awayScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
  },
  {
    id: "s4",
    matchType: "t20" as any,
    status: "upcoming" as any,
    result: "",
    venue: "Gaddafi Stadium, Lahore",
    homeTeam: { flagEmoji: "🇱🇰", name: "Sri Lanka", countryCode: "SL" },
    awayTeam: { flagEmoji: "🇧🇩", name: "Bangladesh", countryCode: "BAN" },
    date: BigInt(Date.now() + 345600000),
    tournament: "T20 Asia Series",
    homeScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
    awayScore: { runs: BigInt(0), wickets: BigInt(0), overs: 0 },
  },
];

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MatchSchedule() {
  const { data, isLoading } = useAllMatches();
  const upcoming = (data ?? FALLBACK).filter(
    (m) =>
      m.status === MatchStatus.upcoming || (m.status as string) === "upcoming",
  );
  const displayed = upcoming.length > 0 ? upcoming.slice(0, 5) : FALLBACK;

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full bg-primary" />
        <h2 className="text-xl font-bold text-foreground">Match Schedule</h2>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        {isLoading ? (
          <div className="p-4 space-y-3" data-ocid="schedule.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : (
          <div data-ocid="schedule.table">
            {displayed.map((match, i) => (
              <div
                key={match.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 ${
                  i < displayed.length - 1 ? "border-b border-border" : ""
                } hover:bg-secondary/50 transition-colors`}
                data-ocid={`schedule.row.${i + 1}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl">{match.homeTeam.flagEmoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {match.homeTeam.name}{" "}
                      <span className="text-muted-foreground">vs</span>{" "}
                      {match.awayTeam.name} {match.awayTeam.flagEmoji}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {match.tournament}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(match.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{match.venue}</span>
                  </span>
                  <span className="uppercase text-primary border border-primary/30 rounded px-1.5 py-0.5 font-medium">
                    {typeof match.matchType === "string"
                      ? match.matchType
                      : Object.keys(match.matchType)[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
