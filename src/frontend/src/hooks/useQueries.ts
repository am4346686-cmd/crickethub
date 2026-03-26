import { useQuery } from "@tanstack/react-query";
import type {
  CricketMatch,
  NewsArticle,
  PlayerStats,
  PointsTableEntry,
} from "../backend.d";
import { useActor } from "./useActor";

export function useAllMatches() {
  const { actor, isFetching } = useActor();
  return useQuery<CricketMatch[]>({
    queryKey: ["matches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMatches();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllNews() {
  const { actor, isFetching } = useActor();
  return useQuery<NewsArticle[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllPlayerStats() {
  const { actor, isFetching } = useActor();
  return useQuery<PlayerStats[]>({
    queryKey: ["playerStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlayerStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllPointsTable() {
  const { actor, isFetching } = useActor();
  return useQuery<PointsTableEntry[]>({
    queryKey: ["pointsTable"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPointsTable();
    },
    enabled: !!actor && !isFetching,
  });
}
