import { initialState, State } from "./state";
import { Actions, ActionTypes } from "./actions";

export function mainReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.GET_ALL_TEAMS:
      return { ...state, teams: action.payload };
    default:
      return state;
  }
}
