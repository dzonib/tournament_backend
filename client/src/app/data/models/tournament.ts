import { User } from "./user";
import { Team } from "./team";
import { Match } from "./match";

export interface Tournament {
  players: User[];
  teams: Team[];
  matches: [];
}

export class TournamentGraph {
  tournamentPhases: TournamentPhase[];
}

export class TournamentPhase {
  name: string;
  matches: Match[];
}
