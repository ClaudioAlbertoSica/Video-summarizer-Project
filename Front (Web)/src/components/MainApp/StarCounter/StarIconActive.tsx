import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import IconButton from "@mui/material/IconButton";
import { CounterProps } from "./StarCounter";
import "./Stars.css";

interface Props {
  num: number;
  paintThisStar: boolean;
  returnedNumber?: (num: number) => void; //This is optional, only used if Counter is not disabled. If not... is replaced by a placeHolder function, that does nothing (see destructured props)
  starSize: CounterProps["couterSize"];
  starType?: "normal" | "PlaceHolder"; //Explanaition: "none" for normal Counter behaviour; "counter" displays starts as usual, but doesn't change upon clicking a star (counter has a fixed value); "usePlaceHolder" displays grey-colored PlaceHolder stars.
}

function StarIcon({
  num,
  paintThisStar,
  returnedNumber = (num) => {
    num;
  },
  starSize,
  starType = "normal",
}: Props) {
  const startNumber = num;

  /*The number is the position this star will have in the StarCounter (it is, in fact, an ORDINAL number).
  It returns it, so the StarCounter knows up to which to paint, when clicked. */
  const handleClick = () => {
    returnedNumber(startNumber);
  };

  const enabledOrDisabledRenderer = (starTypeToRender: string) => {
    let elementToReturn: React.ReactElement;
    if (starTypeToRender === "PlaceHolder") {
      elementToReturn = <StarHalfIcon fontSize={starSize} color="disabled" />;
    } else if (paintThisStar) {
      elementToReturn = <StarRoundedIcon fontSize={starSize} color="primary" />;
    } else {
      elementToReturn = <StarOutlineRoundedIcon fontSize={starSize} />;
    }
    return elementToReturn;
  };

  return (
    <IconButton className="StarsIcons" onClick={handleClick} size={starSize}>
      {enabledOrDisabledRenderer(starType)}
    </IconButton>
  );
}

export default StarIcon;
