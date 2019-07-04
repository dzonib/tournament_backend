import { Action } from "@ngrx/store";
import { Team } from "../../models/team";
import { User } from "../../models/user";
import { Match } from "../../models/match";

export enum ActionTypes {
  SET_USER_REQUEST = "[User] Set user request",
  SET_USER = "[User] Set user",
  GET_ALL_TEAMS = "[Team] Get all teams",
  GET_ALL_TEAMS_SUCCESS = "[Team] Get all teams success",
  GET_ALL_PLAYERS = "[Player] Get all players",
  GET_ALL_PLAYERS_SUCCESS = "[Player] Get all players success",
  GET_ALL_MATCHES = "[Match] Get all matches with specific tournament id",
  GET_ALL_MATCHES_SUCCESS = "[Match] Get all matches with specific tournament id success"
}

export class SetUserRequest implements Action {
  readonly type = ActionTypes.SET_USER_REQUEST;
  constructor(public payload: { username: string; passwrod: string }) {}
}

export class SetUser implements Action {
  readonly type = ActionTypes.SET_USER;
  constructor(public payload: User) {}
}

export class GetAllTeams implements Action {
  readonly type = ActionTypes.GET_ALL_TEAMS;
}

export class GetAllTeamsSuccess implements Action {
  readonly type = ActionTypes.GET_ALL_TEAMS_SUCCESS;
  constructor(public payload: Team[]) {}
}

export class GetAllPlayers implements Action {
  readonly type = ActionTypes.GET_ALL_PLAYERS;
}

export class GetAllPlayersSuccess implements Action {
  readonly type = ActionTypes.GET_ALL_PLAYERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class GetAllMatches implements Action {
  readonly type = ActionTypes.GET_ALL_MATCHES;
  constructor(public payload: number) {}
}

export class GetAllMatchesSuccess implements Action {
  readonly type = ActionTypes.GET_ALL_MATCHES_SUCCESS;
  constructor(public payload: Match[]) {}
}

export type Actions =
  | SetUserRequest
  | SetUser
  | GetAllTeams
  | GetAllTeamsSuccess
  | GetAllPlayers
  | GetAllPlayersSuccess
  | GetAllMatches
  | GetAllMatchesSuccess;
