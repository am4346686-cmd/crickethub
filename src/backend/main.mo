import Int "mo:core/Int";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Text "mo:core/Text";

actor {
  public type Team = {
    name : Text;
    countryCode : Text;
    flagEmoji : Text;
  };

  public type Score = {
    runs : Int;
    wickets : Int;
    overs : Float;
  };

  public type MatchStatus = {
    #live;
    #completed;
    #upcoming;
  };

  public type MatchType = {
    #t20;
    #odi;
    #test;
  };

  public type CricketMatch = {
    id : Text;
    homeTeam : Team;
    awayTeam : Team;
    homeScore : Score;
    awayScore : Score;
    status : MatchStatus;
    result : Text;
    matchType : MatchType;
    tournament : Text;
    date : Int;
    venue : Text;
  };

  public type PointsTableEntry = {
    team : Team;
    played : Int;
    won : Int;
    lost : Int;
    points : Int;
    netRunRate : Float;
  };

  public type PlayerStats = {
    playerName : Text;
    team : Team;
    runs : Int;
    wickets : Int;
    matches : Int;
  };

  public type NewsArticle = {
    title : Text;
    summary : Text;
    imageUrl : Text;
    date : Int;
    category : Text;
  };

  module CricketMatch {
    public func compare(a : CricketMatch, b : CricketMatch) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  module PointsTableEntry {
    public func compare(a : PointsTableEntry, b : PointsTableEntry) : Order.Order {
      switch (Int.compare(a.points, b.points)) {
        case (#equal) { Text.compare(a.team.name, b.team.name) };
        case (other) { other };
      };
    };
  };

  module PlayerStats {
    public func compare(a : PlayerStats, b : PlayerStats) : Order.Order {
      switch (Int.compare(a.runs, b.runs)) {
        case (#equal) { Text.compare(a.playerName, b.playerName) };
        case (other) { other };
      };
    };
  };

  module NewsArticle {
    public func compare(a : NewsArticle, b : NewsArticle) : Order.Order {
      Text.compare(a.title, b.title);
    };
  };

  // Sample data
  let matches = Map.fromIter<Text, CricketMatch>([("sample", {
    id = "sample";
    homeTeam = {
      name = "India";
      countryCode = "IN";
      flagEmoji = "🇮🇳";
    };
    awayTeam = {
      name = "Australia";
      countryCode = "AUS";
      flagEmoji = "🇦🇺";
    };
    homeScore = {
      runs = 250;
      wickets = 8;
      overs = 50.0;
    };
    awayScore = {
      runs = 248;
      wickets = 10;
      overs = 50.0;
    };
    status = #completed;
    result = "India won by 2 runs";
    matchType = #odi;
    tournament = "World Cup";
    date = 1718064000; // 2024-06-11
    venue = "Mumbai";
  })].values());

  let pointsTable = Map.fromIter<Text, PointsTableEntry>([("sample", {
    team = {
      name = "India";
      countryCode = "IN";
      flagEmoji = "🇮🇳";
    };
    played = 5;
    won = 4;
    lost = 1;
    points = 8;
    netRunRate = 1.25;
  })].values());

  let playerStats = Map.fromIter<Text, PlayerStats>([("sample", {
    playerName = "Virat Kohli";
    team = {
      name = "India";
      countryCode = "IN";
      flagEmoji = "🇮🇳";
    };
    runs = 530;
    wickets = 0;
    matches = 10;
  })].values());

  let news = Map.fromIter<Text, NewsArticle>([("sample", {
    title = "India win thriller";
    summary = "India narrowly defeated Australia in a close World Cup match.";
    imageUrl = "/images/cricket.jpg";
    date = 1718064000;
    category = "Match Report";
  })].values());

  public query ({ caller }) func getAllMatches() : async [CricketMatch] {
    matches.values().toArray().sort();
  };

  public query ({ caller }) func getAllPointsTable() : async [PointsTableEntry] {
    pointsTable.values().toArray().sort();
  };

  public query ({ caller }) func getAllPlayerStats() : async [PlayerStats] {
    playerStats.values().toArray().sort();
  };

  public query ({ caller }) func getAllNews() : async [NewsArticle] {
    news.values().toArray().sort();
  };
};
