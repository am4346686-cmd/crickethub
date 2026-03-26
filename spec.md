# CricketHub

## Current State
App has: Header, Hero, LiveMatches, MatchSchedule, RecentNews, PointsTableAndStats (with international teams), Footer.

## Requested Changes (Diff)

### Add
- New `IplTeams` component showing all 10 IPL franchise teams with team name, city, logo emoji, home ground, and primary color accent.

### Modify
- App.tsx to include the IplTeams section.

### Remove
- Nothing.

## Implementation Plan
1. Create `src/frontend/src/components/IplTeams.tsx` with all 10 IPL teams data.
2. Add `<IplTeams />` in `App.tsx` after LiveMatches section.
