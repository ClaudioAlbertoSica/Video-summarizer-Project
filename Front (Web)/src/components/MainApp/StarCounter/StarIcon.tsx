import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import IconButton from "@mui/material/IconButton";

interface Props {
  num: number;
  paintThisStar: boolean;
  returnedNumber: (num: number) => void;
  starSize: "small" | "inherit" | "large" | "medium";
}

function StarIcon({ num, paintThisStar, returnedNumber, starSize }: Props) {
  const startNumber = num;

  const handleClick = () => {
    returnedNumber(startNumber);
  };

  return (
    <IconButton onClick={handleClick}>
      {paintThisStar ? <StarRoundedIcon fontSize={starSize} /> : <StarOutlineRoundedIcon fontSize={starSize} />}
    </IconButton>
  );
}

export default StarIcon;
