import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import IconButton from "@mui/material/IconButton";
import { CounterProps } from "./StarCounter";
import "./Stars.css";

interface Props {
  num: number;
  paintThisStar: boolean;
  returnedNumber: (num: number) => void;
  starSize: CounterProps["couterSize"];
  disabled?: boolean; //True is used for placeholders. Gray-colored. User interaction disbled
}

function StarIcon({ num, paintThisStar, returnedNumber, starSize, disabled = false }: Props) {
  const startNumber = num;

  const handleClick = () => {
    returnedNumber(startNumber);
  };

  const enabledOrDisabledRenderer = (disable: boolean) => {
    let elementToReturn: React.ReactElement;
    if (disable) {
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
      {enabledOrDisabledRenderer(disabled)}
    </IconButton>
  );
}

export default StarIcon;
