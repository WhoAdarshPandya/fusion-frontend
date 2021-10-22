import { ON, OFF } from ".";
import { WellBeingReducerType } from "./WellBeingContext";

export let reducer: WellBeingReducerType = (state, action) => {
  switch (action.type) {
    case ON:
      return { ...state, isTurnedOn: true };
    case OFF:
      return { ...state, isTurnedOn: false };
    default:
      return state;
  }
};
