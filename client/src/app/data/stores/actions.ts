import { Action } from "@ngrx/store";
import { Team } from "../models/team";

export enum ActionTypes {
  GET_ALL_TEAMS_REQUEST = "[Team] Get all teams request",
  GET_ALL_TEAMS = "[Team] Get all teams"
}

export class GetAllTeamsRequest implements Action {
  readonly type = ActionTypes.GET_ALL_TEAMS_REQUEST;
}

export class GetAllTeams implements Action {
  readonly type = ActionTypes.GET_ALL_TEAMS;
  payload: Team[];
}

export type Actions = GetAllTeamsRequest | GetAllTeams;
