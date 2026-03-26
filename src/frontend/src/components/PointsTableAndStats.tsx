import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { PlayerStats, PointsTableEntry } from "../backend.d";
import { useAllPlayerStats, useAllPointsTable } from "../hooks/useQueries";

const FALLBACK_POINTS: PointsTableEntry[] = [
  {
    team: { flagEmoji: "🇮🇳", name: "India", countryCode: "IND" },
    played: BigInt(8),
    won: BigInt(6),
    lost: BigInt(2),
    points: BigInt(12),
    netRunRate: 1.23,
  },
  {
    team: { flagEmoji: "🇦🇺", name: "Australia", countryCode: "AUS" },
    played: BigInt(8),
    won: BigInt(5),
    lost: BigInt(3),
    points: BigInt(10),
    netRunRate: 0.87,
  },
  {
    team: { flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "England", countryCode: "ENG" },
    played: BigInt(8),
    won: BigInt(5),
    lost: BigInt(3),
    points: BigInt(10),
    netRunRate: 0.45,
  },
  {
    team: { flagEmoji: "🇳🇿", name: "New Zealand", countryCode: "NZ" },
    played: BigInt(8),
    won: BigInt(4),
    lost: BigInt(4),
    points: BigInt(8),
    netRunRate: 0.12,
  },
  {
    team: { flagEmoji: "🇵🇰", name: "Pakistan", countryCode: "PAK" },
    played: BigInt(8),
    won: BigInt(3),
    lost: BigInt(5),
    points: BigInt(6),
    netRunRate: -0.33,
  },
];

const FALLBACK_PLAYERS: PlayerStats[] = [
  {
    playerName: "Virat Kohli",
    team: { flagEmoji: "🇮🇳", name: "India", countryCode: "IND" },
    matches: BigInt(15),
    runs: BigInt(720),
    wickets: BigInt(0),
  },
  {
    playerName: "Steve Smith",
    team: { flagEmoji: "🇦🇺", name: "Australia", countryCode: "AUS" },
    matches: BigInt(14),
    runs: BigInt(651),
    wickets: BigInt(0),
  },
  {
    playerName: "Ben Stokes",
    team: { flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "England", countryCode: "ENG" },
    matches: BigInt(13),
    runs: BigInt(510),
    wickets: BigInt(22),
  },
  {
    playerName: "Babar Azam",
    team: { flagEmoji: "🇵🇰", name: "Pakistan", countryCode: "PAK" },
    matches: BigInt(14),
    runs: BigInt(590),
    wickets: BigInt(0),
  },
];

export default function PointsTableAndStats() {
  const { data: pointsData, isLoading: pointsLoading } = useAllPointsTable();
  const { data: statsData, isLoading: statsLoading } = useAllPlayerStats();

  const points = (
    pointsData && pointsData.length > 0 ? pointsData : FALLBACK_POINTS
  ).slice(0, 6);
  const players = (
    statsData && statsData.length > 0 ? statsData : FALLBACK_PLAYERS
  ).slice(0, 5);

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full bg-primary" />
        <h2 className="text-xl font-bold text-foreground">
          Standings & Player Stats
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Points Table */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-card"
          data-ocid="standings.card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-foreground">Points Table</h3>
          </div>
          {pointsLoading ? (
            <div className="p-4 space-y-2" data-ocid="standings.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-5 gap-2 px-5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border">
                <span className="col-span-2">Team</span>
                <span className="text-center">P</span>
                <span className="text-center">W</span>
                <span className="text-center text-primary">Pts</span>
              </div>
              {points.map((entry, i) => (
                <div
                  key={entry.team.countryCode}
                  className={`grid grid-cols-5 gap-2 px-5 py-3 items-center text-sm ${
                    i < points.length - 1 ? "border-b border-border" : ""
                  } hover:bg-secondary/40 transition-colors`}
                  data-ocid={`standings.row.${i + 1}`}
                >
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-lg">{entry.team.flagEmoji}</span>
                    <span className="font-medium text-foreground text-xs truncate">
                      {entry.team.name}
                    </span>
                  </div>
                  <span className="text-center text-muted-foreground">
                    {Number(entry.played)}
                  </span>
                  <span className="text-center text-muted-foreground">
                    {Number(entry.won)}
                  </span>
                  <span className="text-center font-bold text-primary">
                    {Number(entry.points)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Player Stats */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-card"
          data-ocid="players.card"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-foreground">Top Players</h3>
          </div>
          {statsLoading ? (
            <div className="p-4 space-y-2" data-ocid="players.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-4 gap-2 px-5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border">
                <span className="col-span-2">Player</span>
                <span className="text-center">Runs</span>
                <span className="text-center">Wkts</span>
              </div>
              {players.map((player, i) => (
                <div
                  key={player.playerName}
                  className={`grid grid-cols-4 gap-2 px-5 py-3 items-center text-sm ${
                    i < players.length - 1 ? "border-b border-border" : ""
                  } hover:bg-secondary/40 transition-colors`}
                  data-ocid={`players.row.${i + 1}`}
                >
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-lg">{player.team.flagEmoji}</span>
                    <div>
                      <p className="font-medium text-foreground text-xs">
                        {player.playerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {player.team.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-center font-bold text-primary">
                    {Number(player.runs)}
                  </span>
                  <span className="text-center text-muted-foreground">
                    {Number(player.wickets)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
