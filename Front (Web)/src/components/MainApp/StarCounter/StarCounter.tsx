import { ReactElement, useState } from "react";
import StartIcon from "./StarIcon.tsx";
import { Typography } from "@mui/material";
import "./Stars.css";

export interface CounterProps {
  starsToShow: number;
  starsToColour?: number;
  couterSize: "small" | "large" | "medium";
  disabled?: boolean; //True is used for placeholders. Gray-colored. User interaction disbled
}

type StringToNumberMap = {
  [key: string]: number;
};

function StarCounter({ starsToShow, couterSize, starsToColour = 0, disabled = false }: CounterProps) {
  const [paintedStars, setPaintedStars] = useState<number>(starsToColour);

  const renderStars = () => {
    //Draws the required amount of stars. Also colours the user-selected amount.
    const objects: ReactElement[] = [];
    for (let index = 1; index <= starsToShow; index++) {
      const paintThisOne: boolean = index <= paintedStars;
      objects.push(
        <StartIcon
          key={index}
          num={index}
          paintThisStar={paintThisOne}
          returnedNumber={setPaintedStars}
          starSize={couterSize}
          disabled={disabled}
        />
      );
    }
    return objects;
  };

  /*Next map, and next convertStringToNumber function are just to convert the string-based Size for star and counter, to numbers, 
  because the title only understands numbers, and not the string (understood by the icons)*/
  const stringToNumber: StringToNumberMap = {
    small: 15,
    medium: 20,
    large: 30,
  };

  function convertStringToNumber(thisSize: string): number | undefined {
    return stringToNumber[thisSize];
  }

  return (
    <>
      <Typography className="CounterTitle" variant="subtitle2" textAlign="left" fontSize={convertStringToNumber(couterSize)}>
        Rating
      </Typography>
      {renderStars()}
    </>
  );
}

export default StarCounter;
