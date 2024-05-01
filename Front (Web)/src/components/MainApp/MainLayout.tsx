import Grid from "@mui/material/Grid";
import "./MainLayout.css";
import { Container } from "@mui/material";
import SidePanel from "./SidePanel/SidePanel.tsx";
import StarCounter from "./StarCounter/StarCounter.tsx";
import SummaryListItem from "./SidePanel/SidePanelComponents/List/SummaryListItem.tsx";
import testImage from "../../assets/Logo.png";
import SummaryListItemPlaceHolder from "./SidePanel/SidePanelComponents/List/SummaryListItemPlaceHolder.tsx";

function GridLayout() {
  /*Please notice that <Grid> component doesn't allow RowSpan, so 
  you will find a <Container> with another <Container> whithin as sidepanel 
  and a <Grid> for the Header, Central, and Footer Panels*/

  return (
    <Container className="ExternalContainer">
      <Container className="SidePanelContainer">
        <SidePanel />
      </Container>

      <Grid className="ContainerGrid" container spacing={0}>
        <Grid className="HeaderGrid" item xs={12}>
          <h1>Header</h1>
        </Grid>
        <Grid className="CentralPanel" item xs={12}>
          <h1>CentralPanel</h1>
          <SummaryListItem thisItemRating={5} image={testImage} title={"Título de prueba"} />
          <SummaryListItemPlaceHolder />
        </Grid>
        <Grid className="FooterGrid" item xs={12}>
          <h1>Footer</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GridLayout;
