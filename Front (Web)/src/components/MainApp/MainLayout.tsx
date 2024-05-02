import Grid from "@mui/material/Grid";
import "./MainLayout.css";
import { Button, Container } from "@mui/material";
import SidePanel from "./SidePanel/SidePanel.tsx";
import AccountData from "./Views/AccountData.tsx";
import ChangePassword from "./Views/ChangePassword.tsx";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ValidViewNames } from "./Views/ImTheActiveView.ts";
import ImTheActiveView from "./Views/ImTheActiveView.ts";

export const ButtonViewContext = createContext<Dispatch<SetStateAction<ValidViewNames>>>(() => {});

function GridLayout() {
  const [selectedCentralPanelView, setSelectedCentralPanelView] = useState<ValidViewNames>(ValidViewNames.noneSelected);

  /*Please notice that <Grid> component doesn't allow RowSpan, so 
  you will find a <Container> with another <Container> whithin as sidepanel 
  and a <Grid> for the Header, Central, and Footer Panels*/

  return (
    <Container className="ExternalContainer">
      <Container className="SidePanelContainer">
        <ButtonViewContext.Provider value={setSelectedCentralPanelView}>
          <SidePanel />
        </ButtonViewContext.Provider>
      </Container>

      <Grid className="ContainerGrid" container spacing={0}>
        <Grid className="HeaderGrid" item xs={12}>
          <h1>Header</h1>
        </Grid>
        {/*
          Idea here is that, when clicked, Buttons in the SidePanel shoot a View-Name. that name is stored as a State
          in this MainLayoutcomponent.
          The code below the "CentralPanel" Grid will use the ImTheActiveView() function, that will only be true for the
          Desired View.
          Close Button beloew shoots "noneSelected", so no view is displayed at all.
          */}
        <Grid className="CentralPanel" item xs={12}>
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.AccountData) && (
            <AccountData userID="IDFalsa 123" userName="Nombre@Hola.com" />
          )}
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.ChangePassword) && <ChangePassword />}

          {selectedCentralPanelView != ValidViewNames.noneSelected && (
            <Button
              className="CloseButton"
              variant="outlined"
              color="error"
              onClick={() => setSelectedCentralPanelView(ValidViewNames.noneSelected)}
            >
              Cerrar
            </Button>
          )}
        </Grid>
        <Grid className="FooterGrid" item xs={12}>
          <h1>Footer</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GridLayout;
