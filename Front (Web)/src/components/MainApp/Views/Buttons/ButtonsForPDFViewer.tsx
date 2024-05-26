// import { Button } from "@mui/material";

// import SendIcon from "@mui/icons-material/Send";
import DeletePDF from "./DeletePDF";

function ButtonsForPDFViewer() {
  return (
    <>
      {/*<Button className="CloseButton" variant="contained" color="info" endIcon={<SendIcon />}>
        Enviar
      </Button> */}
      <DeletePDF />
    </>
  );
}

export default ButtonsForPDFViewer;
