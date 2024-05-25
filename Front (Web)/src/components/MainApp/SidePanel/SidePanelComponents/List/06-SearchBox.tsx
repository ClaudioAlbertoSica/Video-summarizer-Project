import { Container, TextField } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

function SearchBox() {
  return (
    <Container>
      <ManageSearchIcon />
      <TextField id="filled-search" label="Search field" type="search" variant="filled" />
    </Container>
  );
}

export default SearchBox;
