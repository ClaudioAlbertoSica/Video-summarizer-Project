import { ReactElement, useState } from "react";
import StartIcon from "./StarIcon.tsx";
import { Typography } from "@mui/material";

interface Props {
  starsToShow: number;
  couterSize: "small" | "inherit" | "large" | "medium";
}

function StarCounter({ starsToShow, couterSize }: Props) {
  const [paintedStars, setPaintedStars] = useState<number>(0);

  const renderStars = () => {
    const objects: ReactElement[] = [];
    for (let index = 1; index <= starsToShow; index++) {
      const paintThisOne: boolean = index <= paintedStars;
      objects.push(
        <StartIcon key={index} num={index} paintThisStar={paintThisOne} returnedNumber={setPaintedStars} starSize={couterSize} />
      );
    }
    return objects;
  };

  return (
    <>
      <Typography variant="subtitle2" textAlign="left">
        Rating
      </Typography>
      {renderStars()}
    </>
  );
}

export default StarCounter;
