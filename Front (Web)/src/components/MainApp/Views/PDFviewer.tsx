import { useContext, useEffect, useRef, useState } from "react";
import server from "../../../Services/serverCall.ts";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";
import "./View.css";
import { Container } from "@mui/material";
import PDFviwerHeader from "./PDFviwerHeader.tsx";
import { Summary } from "../../../Services/Types/UserTypes.ts";
import { SelectedSummaryContext, defaultSummary } from "../SelectedSummaryContext.ts";
import LoadingScreenPDF from "./LoadingScreenPDF.tsx";

type pdfInResponse = {
  pdf: pdf;
};

type pdf = {
  filename: string;
  content_type: string;
  data: string;
};

export type ServerSummaryResponse = Summary & pdfInResponse;

function PDFviewer() {
  const activeUSer = useContext(LoggedUserContext);
  const [documentToShow, setDocumentToShow] = useState<Blob>(new Blob());
  const currentDocument = useRef<Summary>(defaultSummary);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const summaryContext = useContext(SelectedSummaryContext);

  const base64toBlob = (data: string) => {
    // Remove the prefix 'data:application/pdf;base64' from the raw base64
    //const base64WithoutPrefix = data.slice("data:application/pdf;base64,".length);
    const byteArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    return new Blob([byteArray], { type: "application/pdf" });
  };

  useEffect(() => {
    const call = async () => {
      await server
        .get<ServerSummaryResponse>(`/${activeUSer.userState.id}/resumen/${summaryContext.State.idres}`)
        .then((res) => {
          currentDocument.current = res.data;
          setIsLoading(false);
          setDocumentToShow(base64toBlob(res.data.pdf.data));
        })
        .catch((err) => {
          setDocumentToShow(new Blob()); // This is just to show nothing, if nothing arrives (otherwise, last PDF remains visible)
          console.log(err.error);
        });
    };
    setIsLoading(true);
    call();
  }, [summaryContext.State.idres]);

  return (
    <Container className="ContainerForPDFViewr">
      <Container className="ContainerForPDFViewrHeader">{!isLoading && <PDFviwerHeader {...summaryContext.State} />}</Container>
      <Container className="containerForPDFViewrEmbeded">
        {isLoading ? (
          <LoadingScreenPDF />
        ) : (
          <embed className="embededPDFViewr" src={URL.createObjectURL(documentToShow)} type="application/pdf" />
        )}
      </Container>
    </Container>
  );
}

export default PDFviewer;
