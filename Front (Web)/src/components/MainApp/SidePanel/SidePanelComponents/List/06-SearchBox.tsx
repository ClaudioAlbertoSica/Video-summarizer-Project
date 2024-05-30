import { Container, InputAdornment, TextField } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import "./List&Handler.css";

interface Props {
  filter: (arg: string) => void;
}

function SearchBox({ filter }: Props) {
  return (
    <Container className="searchBoxContainer">
      {/* <ManageSearchIcon fontSize="large" /> This places icon outside searchbox*/}
      <TextField
        className="SearchBox"
        id="filled-search"
        placeholder="Search field"
        type="search"
        variant="filled"
        onChange={(event) => filter(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className="InputSearchbox">
              <ManageSearchIcon fontSize="medium" />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}

export default SearchBox;
