import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { MatchStatus } from "../backend.d";
import type { CricketMatch } from "../backend.d";
import { useAllMatches } from "../hooks/useQueries";

const FALLBACK: CricketMatch[] = [
  {
    id: "1",
    matchType: "t20" as any,
    status: "live" as any,
    result: "",
    venue: "Eden Gardens, Kolkata",
    homeTeam: { flagEmoji: "🇮🇳", name: "India", countryCode: "IND" },
    awayTeam: { flagEmoji: "🇦🇺", name: "Australia", countryCode: "AUS" },
    date: BigInt(Date.now()),
    tournament: "ICC T20 World Cup",
    homeScore: { runs: BigInt(187), wickets: BigInt(3), overs: 18.4 },
    awayScore: { runs: BigInt(152), wickets: BigInt(6), overs: 17.0 },
  },
  {
    id: "2",
    matchType: "odi" as any,
    status: "live" as any,
    result: "",
    venue: "Lord's Cricket Ground, London",
    homeTeam: { flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "England", countryCode: "ENG" },
    awayTeam: { flagEmoji: "🇵🇰", name: "Pakistan", countryCode: "PAK" },
    date: BigInt(Date.now()),
    tournament: "ICC ODI Series",
    homeScore: { runs: BigInt(265), wickets: BigInt(8), overs: 45.3 },
    awayScore: { runs: BigInt(198), wickets: BigInt(4), overs: 35.0 },
  },
];

function MatchCard({ match, index }: { match: CricketMatch; index: number }) {
  const isLive =
    match.status === MatchStatus.live || (match.status as string) === "live";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 shadow-card"
      data-ocid={`matches.item.${index + 1}`}
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="text-xs border-border text-muted-foreground uppercase"
        >
          {typeof match.matchType === "string"
            ? match.matchType
            : Object.keys(match.matchType)[0]}
        </Badge>
        {isLive && (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-destructive text-xs font-semibold uppercase">
              Live
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-3xl">{match.homeTeam.flagEmoji}</span>
          <span className="text-sm font-semibold text-foreground">
            {match.homeTeam.name}
          </span>
          <span className="text-lg font-bold text-primary">
            {Number(match.homeScore.runs)}/{Number(match.homeScore.wickets)}
          </span>
          <span className="text-xs text-muted-foreground">
            {match.homeScore.overs} ov
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-muted-foreground font-bold text-sm">VS</span>
        </div>
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="text-3xl">{match.awayTeam.flagEmoji}</span>
          <span className="text-sm font-semibold text-foreground">
            {match.awayTeam.name}
          </span>
          <span className="text-lg font-bold text-foreground">
            {Number(match.awayScore.runs)}/{Number(match.awayScore.wickets)}
          </span>
          <span className="text-xs text-muted-foreground">
            {match.awayScore.overs} ov
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">{match.venue}</p>
        <p className="text-xs text-muted-foreground">{match.tournament}</p>
      </div>

      <Button
        size="sm"
        className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
        variant="outline"
        data-ocid={`matches.secondary_button.${index + 1}`}
      >
        View Scorecard
      </Button>
    </motion.div>
  );
}

export default function LiveMatches() {
  const { data, isLoading } = useAllMatches();
  const liveMatches = (data ?? FALLBACK).filter(
    (m) => m.status === MatchStatus.live || (m.status as string) === "live",
  );
  const displayed = liveMatches.length > 0 ? liveMatches.slice(0, 2) : FALLBACK;

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full bg-primary" />
        <h2 className="text-xl font-bold text-foreground">Live Matches</h2>
        <span className="flex items-center gap-1 ml-auto">
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-xs text-destructive font-medium">LIVE NOW</span>
        </span>
      </div>
      {isLoading ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="matches.loading_state"
        >
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-56 rounded-xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
