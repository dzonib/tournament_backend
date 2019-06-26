import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";
import { State } from "./state";
import { Team } from "../models/team";

export const selectAllState = createFeatureSelector<State>("mainState");

export const selectTeams = (state: State) => state.teams;

export const selectAllTeams: MemoizedSelector<State, Team[]> = createSelector(
  selectAllState,
  state => selectTeams(state)
);
