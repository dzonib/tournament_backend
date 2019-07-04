import { Team } from "../../models/team";
import { User } from "../../models/user";
import { Tournament } from "../../models/tournament";
import { Match } from "../../models/match";

export interface State {
  user: User | {};
  users: User[];
  teams: Team[];
  matchesWithSpecificTournament: Match[];
  tournament: Tournament;
}

export const initialState: State = {
  user: {},
  users: [],
  teams: [],
  matchesWithSpecificTournament: [],
  tournament: {
    players: [],
    teams: [],
    matches: []
  }
};
