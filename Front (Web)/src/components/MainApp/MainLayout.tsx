import Grid from "@mui/material/Grid";
import "./MainLayout.css";
import { Container } from "@mui/material";
import SidePanel from "./SidePanel/SidePanel.tsx";
import AccountData from "./Views/AccountData.tsx";
import ChangePassword from "./Views/ChangePassword.tsx";
import { useState } from "react";
import { ValidViewNames } from "./Views/ImTheActiveView.ts";
import ImTheActiveView from "./Views/ImTheActiveView.ts";
import FAQ from "./Views/FAQ.tsx";
import CloseButton from "./Views/CloseButton.tsx";
import Help from "./Views/Help.tsx";
import VideoForm from "./Views/VideoForm.tsx";
import TextForm from "./Views/TextForm.tsx";
import { ButtonViewContext } from "./ButtonViewContext.ts";

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
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.AccountData) && <AccountData />}
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.ChangePassword) && <ChangePassword />}
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.FAQ) && <FAQ />}
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.Help) && <Help />}
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.VideoForm) && <VideoForm />}
          {ImTheActiveView(selectedCentralPanelView, ValidViewNames.TextForm) && <TextForm />}
          {selectedCentralPanelView != ValidViewNames.noneSelected && (
            <CloseButton closeFunction={() => setSelectedCentralPanelView(ValidViewNames.noneSelected)} />
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
