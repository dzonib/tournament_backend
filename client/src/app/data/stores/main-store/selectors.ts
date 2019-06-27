import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { State } from "./state";
import { Team } from "../../models/team";
import { User } from "../../models/user";

export const selectAllState = createFeatureSelector<State>("mainState");

export const selectTeamsData = (state: State) => state.teams;

export const selectAllTeams: MemoizedSelector<State, Team[]> = createSelector(
  selectAllState,
  state => selectTeamsData(state)
);

export const getUserData = (state: State) => state.user;

export const selectUser: MemoizedSelector<State, User | {}> = createSelector(
  selectAllState,
  state => getUserData(state)
);

export const selectPlayersData = (state: State) => state.users;

export const selectAllPlayers: MemoizedSelector<State, User[]> = createSelector(
  selectAllState,
  state => selectPlayersData(state)
);
