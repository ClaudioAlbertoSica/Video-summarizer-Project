import { Avatar, Container } from "@mui/material";
import Logo from "../../../assets/Logo.png";
import "./SidePanel.css";
import Accordion from "./SidePanelComponents/AccordionForSidepanel.tsx";

function SidePanel() {
  return (
    <>
      <Avatar className="SidePanelLogo" alt="Avatar" src={Logo} />
      <Container className="SidePanelAccordionContainer">
        <Accordion />
      </Container>
    </>
  );
}

export default SidePanel;
