import { Avatar, Container, Typography } from "@mui/material";
import StarCounter from "../StarCounter/StarCounter";
import "./View.css";
import { Summary } from "../../../Services/Types/UserTypes";
import placeholderAvatar from "../../../assets/PlaceHolderAvatar2.png";

function PDFviwerHeader({ thumbnail, title, points, isFavourite, idres }: Summary) {
  const binarytoBlob = (data: string) => {
    const byteArray = Uint8Array.from(data, (c) => c.charCodeAt(0));
    return new Blob([byteArray], { type: "image/jpg" });
  };

  const urlforBlob = (data: Blob) => {
    const url = URL.createObjectURL(data);
    return url;
  };

  const urlForThumbnail = () => {
    return urlforBlob(binarytoBlob(thumbnail));
  };

  return (
    <>
      {idres != "-1" && (
        <Container className="HeaderItemsConatiner">
          <Avatar className="PDFviewrHeadAvatar" src={thumbnail ? urlForThumbnail() : placeholderAvatar}></Avatar>
          <Typography className="SummaryTitle" variant="h4" textAlign="left">
            {title}
          </Typography>
          <Container style={{ display: "inline-flex", maxWidth: "fit-content", margin: "0px" }}>
            <StarCounter
              starsToShow={5}
              couterSize="large"
              starsToColour={points}
              isLiked={isFavourite}
              showTrashAndFavs={"both"}
            />
          </Container>
        </Container>
      )}
    </>
  );
}

export default PDFviwerHeader;
