import { useContext, useEffect, useRef, useState } from "react";
import server from "../../../Services/serverCall.ts";
import { SelectedSummaryContext } from "../SelectedSummaryContext.ts";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";

type receivedResponse = {
  pdf: pdf;
};

type pdf = {
  filename: string;
  content_type: string;
  data: string;
};

function PDFviewer() {
  const [selectedSummary] = useContext(SelectedSummaryContext);
  const activeUSer = useContext(LoggedUserContext);
  const [documentToShow, setDocumentToShow] = useState<Blob>(new Blob());
  const title = useRef("");

  const base64toBlob = (data: string) => {
    // Remove the prefix 'data:application/pdf;base64' from the raw base64
    //const base64WithoutPrefix = data.slice("data:application/pdf;base64,".length);
    const byteArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    return new Blob([byteArray], { type: "application/pdf" });
  };

  useEffect(() => {
    const call = async () => {
      await server
        .get<receivedResponse>(`/${activeUSer.userState.id}/resumen/${selectedSummary.idRes}`)
        .then((res) => {
          console.log(`then - ${selectedSummary.idRes} + ${selectedSummary.title}`);
          setDocumentToShow(base64toBlob(res.data.pdf.data));
          title.current = res.data.pdf.filename;
        })
        .catch((err) => console.log(err.error));
    };
    call();
  }, [selectedSummary]);

  return (
    <div>
      <embed src={URL.createObjectURL(documentToShow)} title="Titulo" type="application/pdf" width="100%" height="600px" />
    </div>
  );
}

export default PDFviewer;

//      <iframe src={samplePDF}></iframe>
