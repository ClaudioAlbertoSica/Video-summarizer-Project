import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useState } from "react";
import { IconButton } from "@mui/material";

function Favorite() {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <IconButton
      onClick={() => {
        setLiked(!liked), console.log(liked);
      }}
    >
      {liked && <ThumbUpAltIcon color="success" />}
      {!liked && <ThumbUpOffAltIcon />}
    </IconButton>
  );
}

export default Favorite;
