import { styled, useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ListHandler from "./List/01-ListHandler";
import AccountDataButtons from "./ButtonStacks/AccountDataButtons";
import ConfigurationButtons from "./ButtonStacks/ConfigurationButtons";
import NewSummaryButtons from "./ButtonStacks/NewSummaryButtons";

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowDownIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
//  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState<string | false>("panel1"); // possible string values are "panel1", "panel2", "panel3", etc...
  const myTheme = useTheme();
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{ backgroundColor: myTheme.palette.my.header, borderRadius: '10px', margin: '3px 5px'}}>
          <Typography>Nuevo Resumen</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NewSummaryButtons />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{ backgroundColor: myTheme.palette.my.header, borderRadius: '10px', margin: '3px 5px' }}>
          <Typography>Cuenta</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccountDataButtons />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" sx={{ backgroundColor: myTheme.palette.my.header, borderRadius: '10px', margin: '3px 5px' }}>
          <Typography>Configuración y Ayuda</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ConfigurationButtons />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" sx={{ backgroundColor: myTheme.palette.my.header, borderRadius: '10px', margin: '3px 5px' }}>
          <Typography>Favoritos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListHandler isFavoritesList />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header" sx={{ backgroundColor: myTheme.palette.my.header, borderRadius: '10px', margin: '3px 5px' }}>
          <Typography>Historial</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListHandler />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
