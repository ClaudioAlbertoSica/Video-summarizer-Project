import Grid from "@mui/material/Grid";
import "./MainLayout.css";
import { Container, useTheme } from "@mui/material";
import SidePanel from "./SidePanel/SidePanel.tsx";
import AccountData from "./Views/AccountData.tsx";
import ChangePassword from "./Views/ChangePassword.tsx";
import { ReactElement, useState } from "react";
import { ValidViewNames } from "./Views/ImTheActiveView.ts";
import ImTheActiveView from "./Views/ImTheActiveView.ts";
import FAQ from "./Views/FAQ.tsx";
import CloseButton from "./Views/Buttons/ButtonsForViews.tsx";
import Help from "./Views/Help.tsx";
import VideoForm from "./Views/VideoForm.tsx";
import TextForm from "./Views/TextForm.tsx";
import { ButtonViewContext } from "./ButtonViewContext.ts";
import PDFviewer from "./Views/PDFviewer.tsx";
import WIPindicator from "./WorkInProgressIndicator/WIPindicator.tsx";
import { SelectedSummaryContext, defaultSummary } from "./SelectedSummaryContext.ts";
import { Summary } from "../../Services/Types/UserTypes.ts";
import Comments from "./Views/Comments.tsx";

interface InitialInfo {
  isProvisoryPassword: boolean;
}

function GridLayout({ isProvisoryPassword }: InitialInfo) {
  const [selectedCentralPanelView, setSelectedCentralPanelView] = useState<ValidViewNames>(
    isProvisoryPassword ? ValidViewNames.ChangePasswordMandatory : ValidViewNames.noneSelected
  );
  const [selectedSummary, setSelectedSummary] = useState<Summary>(defaultSummary);
  const [forcePasswordChangeScreen, setForcePasswordChangeScreen] = useState<boolean>(isProvisoryPassword);
  const myTheme = useTheme();

  const checkForForcedView = () => {
    /* Allows normal view-change behaviour, or forces a specific view. In the later scenario, usual view change will be 
    impossible, and forced view must provide a way to return to normal behaviour
    */
    const normalBehaviourViews: ReactElement = (
      <>
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.AccountData) && <AccountData />}
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.ChangePassword) && (
          <ChangePassword forcedBehaviourChanger={setForcePasswordChangeScreen} />
        )}
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.FAQ) && <FAQ />}
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.Help) && <Help />}
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.VideoForm) && <VideoForm />}
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.TextForm) && <TextForm />}
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.Summary) && <PDFviewer />}
        {ImTheActiveView(selectedCentralPanelView, ValidViewNames.Comments) && <Comments />}
        {selectedCentralPanelView != ValidViewNames.noneSelected && (
          <CloseButton
            closeFunction={() => setSelectedCentralPanelView(ValidViewNames.noneSelected)}
            additionalButtonsInformation={selectedCentralPanelView}
          />
        )}
      </>
    );

    const forcedView: ReactElement = <ChangePassword forcedBehaviourChanger={setForcePasswordChangeScreen} />;

    return forcePasswordChangeScreen ? forcedView : normalBehaviourViews;
  };

  /*Please notice that <Grid> component doesn't allow RowSpan, so 
  you will find a <Container> with another <Container> whithin as sidepanel 
  and a <Grid> for the Header, Central, and Footer Panels*/

  return (
    <SelectedSummaryContext.Provider value={{ State: selectedSummary, SetState: setSelectedSummary }}>
      <ButtonViewContext.Provider value={setSelectedCentralPanelView}>
        <Container className="ExternalContainer">
          <Container className="SidePanelContainer" sx={{ backgroundColor: myTheme.palette.my.header }}>
            <SidePanel />
          </Container>

          <Grid className="ContainerGrid" container spacing={0}>
            <Grid className="HeaderGridLeft" item xs={8} sx={{ backgroundColor: myTheme.palette.my.colorRightContent }}>
              {/*               {forcePasswordChangeScreen ? (
                <h1>{ValidViewNames.ChangePasswordMandatory}</h1>
              ) : (
                <h1>{selectedCentralPanelView}</h1>
              )} */}
            </Grid>
            <Grid className="HeaderGridRight" item xs={4} sx={{ backgroundColor: myTheme.palette.my.colorRightContent }}>
              <WIPindicator />
            </Grid>
            {/*
          Idea in the "CentralPanel" is that is has 1 out of 2 behaviours:
          1 - Forced Behaviour: if a view is forced, it will display the forced view, as long as the user doesn't fulfills a mandatory task 
          (like a mandatory password change, when it is recovered)
          2 - Normal Behaviour: when clicked, Buttons in the SidePanel shoot a View-Name. That name is stored as a State
          in this MainLayoutcomponent.
          The code makes use of the ImTheActiveView() function, that will only be true for the desired View.
          Close Button below shoots "noneSelected", so no view (and no button) is displayed at all.
          */}
            <Grid className="CentralPanel" item xs={12} sx={{ backgroundColor: myTheme.palette.my.colorRightContent }}>
              {checkForForcedView()}
            </Grid>
          </Grid>
        </Container>
      </ButtonViewContext.Provider>
    </SelectedSummaryContext.Provider>
  );
}

export default GridLayout;
