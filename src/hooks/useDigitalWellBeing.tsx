import { useContext } from "preact/hooks";
import { OFF, ON, WellBeingContext } from "../contexts/WellBeingContext";

export const useDigitalWellBeing = (): {
  isTurnedOn: boolean;
  turnOnWellBeing: () => void;
  turnOffWellBeing: () => void;
  toggler: () => void;
} => {
  const { state, dispatch } = useContext(WellBeingContext);

  const isTurnedOn = state.isTurnedOn;
  const turnOnWellBeing = () => dispatch({ type: ON });
  const turnOffWellBeing = () => dispatch({ type: OFF });
  const toggler = () => {
    if (state.isTurnedOn) {
      document.body.classList.remove("digital-wellbeing");
      dispatch({ type: OFF });
    } else {
      document.body.classList.add("digital-wellbeing");
      dispatch({ type: ON });
    }
    // state.isTurnedOn ? dispatch({ type: OFF }) : dispatch({ type: ON });
  };
  return { isTurnedOn, turnOnWellBeing, turnOffWellBeing, toggler };
};
