import { User } from "./user";
import { Team } from "./team";

export interface Tournament {
  players: User[];
  teams: Team[];
  matches: [];
}
