import { Container } from "@mui/material";
import "./SidePanel.css";
import Accordion from "./SidePanelComponents/Accordion.tsx";

function SidePanel() {
  return (
    <>
      <Container className="SidePanelLogo" />
      <Container className="SidePanelAccordionContainer">
        <Accordion />
      </Container>
    </>
  );
}

export default SidePanel;
