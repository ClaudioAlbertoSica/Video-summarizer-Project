import DeletePDF from "../../DeletePDF/DeletePDF";
import { SendPDF } from "./SendPDF";

function ButtonsForPDFViewer() {
  return (
    <>
      <SendPDF />
      <DeletePDF buttonType="button" />
    </>
  );
}

export default ButtonsForPDFViewer;
