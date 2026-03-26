import { motion } from "motion/react";

const IPL_TEAMS = [
  {
    abbr: "MI",
    name: "Mumbai Indians",
    city: "Mumbai",
    ground: "Wankhede Stadium",
    color: "#004BA0",
    emoji: "🔵",
  },
  {
    abbr: "CSK",
    name: "Chennai Super Kings",
    city: "Chennai",
    ground: "MA Chidambaram Stadium",
    color: "#F9CD05",
    emoji: "🟡",
  },
  {
    abbr: "RCB",
    name: "Royal Challengers Bengaluru",
    city: "Bengaluru",
    ground: "M. Chinnaswamy Stadium",
    color: "#EC1C24",
    emoji: "🔴",
  },
  {
    abbr: "KKR",
    name: "Kolkata Knight Riders",
    city: "Kolkata",
    ground: "Eden Gardens",
    color: "#3A225D",
    emoji: "🟣",
  },
  {
    abbr: "DC",
    name: "Delhi Capitals",
    city: "Delhi",
    ground: "Arun Jaitley Stadium",
    color: "#282968",
    emoji: "🔷",
  },
  {
    abbr: "PBKS",
    name: "Punjab Kings",
    city: "Mohali",
    ground: "PCA Stadium",
    color: "#ED1B24",
    emoji: "🦁",
  },
  {
    abbr: "RR",
    name: "Rajasthan Royals",
    city: "Jaipur",
    ground: "Sawai Mansingh Stadium",
    color: "#EA1A85",
    emoji: "💗",
  },
  {
    abbr: "SRH",
    name: "Sunrisers Hyderabad",
    city: "Hyderabad",
    ground: "Rajiv Gandhi Stadium",
    color: "#F7A721",
    emoji: "🌅",
  },
  {
    abbr: "GT",
    name: "Gujarat Titans",
    city: "Ahmedabad",
    ground: "Narendra Modi Stadium",
    color: "#1C1C69",
    emoji: "⚡",
  },
  {
    abbr: "LSG",
    name: "Lucknow Super Giants",
    city: "Lucknow",
    ground: "BRSABV Ekana Stadium",
    color: "#A72056",
    emoji: "🏏",
  },
];

function TeamCard({
  team,
  index,
}: { team: (typeof IPL_TEAMS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col"
      data-ocid={`ipl_teams.item.${index + 1}`}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: team.color }} />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{team.emoji}</span>
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: team.color }}
            >
              {team.abbr}
            </p>
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              {team.name}
            </h3>
          </div>
        </div>
        <div className="mt-1 space-y-0.5">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>🏙️</span> {team.city}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>🏟️</span> {team.ground}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function IplTeams() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full bg-primary" />
        <h2 className="text-xl font-bold text-foreground">IPL Teams</h2>
        <span className="ml-auto text-xs text-muted-foreground font-medium uppercase tracking-wide">
          10 Franchises
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {IPL_TEAMS.map((team, i) => (
          <TeamCard key={team.abbr} team={team} index={i} />
        ))}
      </div>
    </section>
  );
}
