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
import CloseButton from "./Views/Buttons/ButtonsForViews.tsx";
import Help from "./Views/Help.tsx";
import VideoForm from "./Views/VideoForm.tsx";
import TextForm from "./Views/TextForm.tsx";
import { ButtonViewContext } from "./ButtonViewContext.ts";
import LoadingScreen from "./Views/LoadingScreen.tsx";
import PDFviewer from "./Views/PDFviewer.tsx";
import WIPindicator from "./WorkInProgressIndicator/WIPindicator.tsx";
import { SelectedSummaryContext, defaultSummary } from "./SelectedSummaryContext.ts";
import { Summary } from "../../Services/Types/UserTypes.ts";

function GridLayout() {
  const [selectedCentralPanelView, setSelectedCentralPanelView] = useState<ValidViewNames>(ValidViewNames.noneSelected);
  const [selectedSummary, setSelectedSummary] = useState<Summary>(defaultSummary);

  /*Please notice that <Grid> component doesn't allow RowSpan, so 
  you will find a <Container> with another <Container> whithin as sidepanel 
  and a <Grid> for the Header, Central, and Footer Panels*/

  return (
    <SelectedSummaryContext.Provider value={{ State: selectedSummary, SetState: setSelectedSummary }}>
      <ButtonViewContext.Provider value={setSelectedCentralPanelView}>
        <Container className="ExternalContainer">
          <Container className="SidePanelContainer">
            <SidePanel />
          </Container>

          <Grid className="ContainerGrid" container spacing={0}>
            <Grid className="HeaderGridLeft" item xs={8}>
              <h1>{selectedCentralPanelView}</h1>
            </Grid>
            <Grid className="HeaderGridRight" item xs={4}>
              <WIPindicator />
            </Grid>
            {/*
          Idea here is that, when clicked, Buttons in the SidePanel shoot a View-Name. That name is stored as a State
          in this MainLayoutcomponent.
          The code below the "CentralPanel" Grid will use the ImTheActiveView() function, that will only be true for the
          desired View.
          Close Button below shoots "noneSelected", so no view is displayed at all.
          */}
            <Grid className="CentralPanel" item xs={12}>
              {ImTheActiveView(selectedCentralPanelView, ValidViewNames.AccountData) && <AccountData />}
              {ImTheActiveView(selectedCentralPanelView, ValidViewNames.ChangePassword) && <ChangePassword />}
              {ImTheActiveView(selectedCentralPanelView, ValidViewNames.FAQ) && <FAQ />}
              {ImTheActiveView(selectedCentralPanelView, ValidViewNames.Help) && <Help />}
              {ImTheActiveView(selectedCentralPanelView, ValidViewNames.VideoForm) && <VideoForm />}
              {ImTheActiveView(selectedCentralPanelView, ValidViewNames.TextForm) && <TextForm />}
              {/*{ImTheActiveView(selectedCentralPanelView, ValidViewNames.Loading) && <LoadingScreen />}*/}
              {ImTheActiveView(selectedCentralPanelView, ValidViewNames.Summary) && <PDFviewer />}
              {selectedCentralPanelView != ValidViewNames.noneSelected && (
                <CloseButton
                  closeFunction={() => setSelectedCentralPanelView(ValidViewNames.noneSelected)}
                  additionalButtonsInformation={selectedCentralPanelView}
                />
              )}
            </Grid>
            <Grid className="FooterGrid" item xs={12}>
              <h1>Footer</h1>
            </Grid>
          </Grid>
        </Container>
      </ButtonViewContext.Provider>
    </SelectedSummaryContext.Provider>
  );
}

export default GridLayout;
