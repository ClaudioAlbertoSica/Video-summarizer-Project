import DeletePDF from "./DeletePDF";
import { SendPDF } from "./SendPDF";

function ButtonsForPDFViewer() {
  return (
    <>
      <SendPDF />
      <DeletePDF />
    </>
  );
}

export default ButtonsForPDFViewer;
