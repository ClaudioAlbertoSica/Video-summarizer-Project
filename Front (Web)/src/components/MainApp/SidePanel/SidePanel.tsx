import { Container, useTheme } from "@mui/material";
import "./SidePanel.css";
import Accordion from "./SidePanelComponents/Accordion.tsx";

function SidePanel() {
  const myTheme = useTheme();
  
  return (
    <>
      <Container className="SidePanelLogo" sx={{backgroundImage: `url(${myTheme.palette.image.home})`}}/>
      <Container className="Curva" sx={{backgroundColor: myTheme.palette.my.header}}/>
      <Container className="SidePanelAccordionContainer">
        <Accordion />
      </Container>
    </>
  );
}

export default SidePanel;
