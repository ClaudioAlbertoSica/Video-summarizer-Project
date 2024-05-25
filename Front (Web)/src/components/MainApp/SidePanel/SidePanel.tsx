import { Avatar, Container } from "@mui/material";
import Logo from "../../../assets/Logo.png";
import "./SidePanel.css";
import Accordion from "./SidePanelComponents/Accordion.tsx";

function SidePanel() {
  return (
    <>
      <Container className="SidePanelLogo"/>
      <Container className="SidePanelAccordionContainer">
        <Accordion />
      </Container>
    </>
  );
}

export default SidePanel;
