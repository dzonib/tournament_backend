import { Team } from '../models/team';
import { User } from '../models/user';

export interface State {
  users: User;
  teams: Team;
}
