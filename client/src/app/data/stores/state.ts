import { Team } from "../models/team";
import { User } from "../models/user";
import { Tournament } from "../models/tournament";

export interface State {
  user: User | {};
  users: User[];
  teams: Team[];
  tournament: Tournament;
}

export const initialState: State = {
  user: {},
  users: [],
  teams: [],
  tournament: {
    players: [],
    teams: [],
    matches: []
  }
}
