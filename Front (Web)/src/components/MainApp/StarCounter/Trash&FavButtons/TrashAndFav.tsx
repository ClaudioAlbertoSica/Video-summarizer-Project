import { Container } from "@mui/material";
import Favorite from "./Favorite";
import Trash from "./Trash";

function TrashAndFav() {
  return (
    <Container>
      <Favorite />
      <Trash />
    </Container>
  );
}

export default TrashAndFav;
