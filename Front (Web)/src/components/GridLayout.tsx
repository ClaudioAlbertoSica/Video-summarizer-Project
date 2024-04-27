import Grid from "@mui/material/Grid";
import "./GridLayout.css";
import { Container } from "@mui/material";

function GridLayout() {
  /*Please notice that <Grid> component doesn't allow RowSpan, so 
  you will find a <Container> with another <Container> whithin as sidepanel 
  and a <Grid> for the Header, Central, and Footer Panels*/
  return (
    <Container className="ExternalContainer">
      <Container className="SidePanelContainer">Hello</Container>

      <Grid className="ContainerGrid" container spacing={0}>
        <Grid className="HeaderGrid" item xs={12}>
          <h1>Header</h1>
        </Grid>
        <Grid className="CentralPanel" item xs={12}>
          <h1>CentralPanel</h1>
        </Grid>
        <Grid className="FooterGrid" item xs={12}>
          <h1>Footer</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GridLayout;
