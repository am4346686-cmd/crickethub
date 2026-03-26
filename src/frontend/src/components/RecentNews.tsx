import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import type { NewsArticle } from "../backend.d";
import { useAllNews } from "../hooks/useQueries";

const NEWS_GRADIENTS = [
  "linear-gradient(135deg, oklch(0.35 0.12 27) 0%, oklch(0.22 0.06 27) 100%)",
  "linear-gradient(135deg, oklch(0.30 0.10 142) 0%, oklch(0.20 0.05 142) 100%)",
  "linear-gradient(135deg, oklch(0.30 0.10 255) 0%, oklch(0.20 0.05 255) 100%)",
];

const EMOJIS = ["🏏", "🏆", "⚡"];

const FALLBACK: NewsArticle[] = [
  {
    title: "India Dominates Australia in Thrilling T20 Finale",
    summary:
      "A sensational last-over finish saw India clinch the series 3-2 with Kohli's breathtaking 94* under pressure.",
    date: BigInt(Date.now() - 3600000),
    imageUrl: "",
    category: "Match Report",
  },
  {
    title: "Ben Stokes Named ICC Cricketer of the Year 2025",
    summary:
      "England all-rounder Ben Stokes takes home the prestigious award for his outstanding performances across all formats.",
    date: BigInt(Date.now() - 86400000),
    imageUrl: "",
    category: "Awards",
  },
  {
    title: "Pakistan's Babar Azam Eyes Record in Upcoming ODI Series",
    summary:
      "Captain Babar Azam is just 128 runs away from becoming Pakistan's all-time leading ODI run scorer.",
    date: BigInt(Date.now() - 172800000),
    imageUrl: "",
    category: "Players",
  },
];

function timeAgo(ts: bigint) {
  const diff = Date.now() - Number(ts);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return "Just now";
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col cursor-pointer hover:border-primary/50 transition-all group"
      data-ocid={`news.item.${index + 1}`}
    >
      <div
        className="h-40 flex items-center justify-center text-5xl"
        style={{ background: NEWS_GRADIENTS[index % NEWS_GRADIENTS.length] }}
      >
        {EMOJIS[index % 3]}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="text-xs border-primary/40 text-primary"
          >
            {article.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {timeAgo(article.date)}
          </span>
        </div>
        <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {article.summary}
        </p>
      </div>
    </motion.div>
  );
}

export default function RecentNews() {
  const { data, isLoading } = useAllNews();
  const articles = (data && data.length > 0 ? data : FALLBACK).slice(0, 3);

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full bg-primary" />
        <h2 className="text-xl font-bold text-foreground">Recent News</h2>
      </div>
      {isLoading ? (
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          data-ocid="news.loading_state"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((article, i) => (
            <NewsCard key={article.title} article={article} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
