import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PointsTableEntry {
    won: bigint;
    played: bigint;
    lost: bigint;
    team: Team;
    netRunRate: number;
    points: bigint;
}
export interface Score {
    overs: number;
    runs: bigint;
    wickets: bigint;
}
export interface CricketMatch {
    id: string;
    matchType: MatchType;
    status: MatchStatus;
    result: string;
    venue: string;
    homeTeam: Team;
    date: bigint;
    tournament: string;
    homeScore: Score;
    awayTeam: Team;
    awayScore: Score;
}
export interface NewsArticle {
    title: string;
    date: bigint;
    summary: string;
    imageUrl: string;
    category: string;
}
export interface PlayerStats {
    runs: bigint;
    team: Team;
    matches: bigint;
    wickets: bigint;
    playerName: string;
}
export interface Team {
    flagEmoji: string;
    name: string;
    countryCode: string;
}
export enum MatchStatus {
    upcoming = "upcoming",
    live = "live",
    completed = "completed"
}
export enum MatchType {
    odi = "odi",
    t20 = "t20",
    test = "test"
}
export interface backendInterface {
    getAllMatches(): Promise<Array<CricketMatch>>;
    getAllNews(): Promise<Array<NewsArticle>>;
    getAllPlayerStats(): Promise<Array<PlayerStats>>;
    getAllPointsTable(): Promise<Array<PointsTableEntry>>;
}
