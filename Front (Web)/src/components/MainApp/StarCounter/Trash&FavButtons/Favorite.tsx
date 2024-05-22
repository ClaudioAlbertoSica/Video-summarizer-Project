import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import { SelectedSummaryContext } from "../../SelectedSummaryContext";
import { LoggedUserContext } from "../../../../ActiveUserContext";
import server from "../../../../../src/Services/serverCall.ts";
import { LoggedUser } from "../../../../Services/Types/UserTypes.ts";

interface Props {
  isLiked: boolean;
}

function Favorite({ isLiked }: Props) {
  const loggedUser = useContext(LoggedUserContext);
  const summaryContext = useContext(SelectedSummaryContext);
  const [liked, setLiked] = useState<boolean>(isLiked);

  const handleClick = async () => {
    const idresSelected = summaryContext.State.idres;
    const selectedResDBindex = loggedUser.userState.inventario.findIndex((sum) => sum.idres === idresSelected);

    await server
      .put(`/${loggedUser.userState.id}/resumen/${summaryContext.State.idres}`, { isFavourite: !liked })
      .then((res) => {
        const newUserContext: LoggedUser = { ...loggedUser.userState };
        newUserContext.inventario[selectedResDBindex].isFavourite = res.data.isFavourite;
        loggedUser.userSteState(newUserContext);
        summaryContext.State.isFavourite = res.data.isFavourite;
        summaryContext.SetState(summaryContext.State);
        setLiked(res.data.isFavourite);
        console.log(res.data.isFavourite);
      })
      .catch((err) => {
        console.log(err.error);
        console.log("Error on update");
      });
  };

  return (
    <IconButton
      onClick={() => {
        handleClick();
      }}
    >
      {liked && <ThumbUpAltIcon color="success" />}
      {!liked && <ThumbUpOffAltIcon />}
    </IconButton>
  );
}

export default Favorite;
