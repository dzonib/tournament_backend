import { Action } from "@ngrx/store";
import { Team } from "../models/team";
import { User } from "../models/user";

export enum ActionTypes {
  SET_USER_REQUEST = "[User] Set user request",
  SET_USER = "[User] Set user",
  GET_ALL_TEAMS_REQUEST = "[Team] Get all teams request",
  GET_ALL_TEAMS = "[Team] Get all teams"
}

export class SetUserRequest implements Action {
  readonly type = ActionTypes.SET_USER_REQUEST;
  constructor(public payload: { username: string; passwrod: string }) {}
}

export class SetUser implements Action {
  readonly type = ActionTypes.SET_USER;
  constructor(public payload: User) {}
}

export class GetAllTeamsRequest implements Action {
  readonly type = ActionTypes.GET_ALL_TEAMS_REQUEST;
}

export class GetAllTeams implements Action {
  readonly type = ActionTypes.GET_ALL_TEAMS;
  constructor(public payload: Team[]) {}
}

export type Actions =
  | GetAllTeamsRequest
  | GetAllTeams
  | SetUserRequest
  | SetUser;
