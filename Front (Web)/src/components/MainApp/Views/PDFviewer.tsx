import { useContext, useEffect, useState } from "react";
import server from "../../../Services/serverCall.ts";
import { LoggedUserContext } from "../../../ActiveUserContext.ts";
import isloadingGif from "../../../assets/isLoading.gif";
import "./View.css";
import { Alert, Container } from "@mui/material";
import PDFviwerHeader from "./PDFviwerHeader.tsx";

type receivedResponse = {
  pdf: pdf;
};

type pdf = {
  filename: string;
  content_type: string;
  data: string;
};

function PDFviewer() {
  const activeUSer = useContext(LoggedUserContext);
  const [documentToShow, setDocumentToShow] = useState<Blob>(new Blob());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const base64toBlob = (data: string) => {
    // Remove the prefix 'data:application/pdf;base64' from the raw base64
    //const base64WithoutPrefix = data.slice("data:application/pdf;base64,".length);
    const byteArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    return new Blob([byteArray], { type: "application/pdf" });
  };

  useEffect(() => {
    const call = async () => {
      await server
        .get<receivedResponse>(`/${activeUSer.userState.id}/resumen/${activeUSer.userState.selectedSummary.idRes}`)
        .then((res) => {
          setIsLoading(false);
          setDocumentToShow(base64toBlob(res.data.pdf.data));
        })
        .catch((err) => console.log(err.error));
    };
    setIsLoading(true);
    call();
  }, [activeUSer.userState]);

  return (
    <Container className="ContainerForPDFViewr">
      <Container className="ContainerForPDFViewrHeader">{!isLoading && <PDFviwerHeader />}</Container>
      <Container className="containerForPDFViewrEmbededs">
        {isLoading ? (
          <img className="embededPDFViewrLoader" src={isloadingGif} title="Titulo" />
        ) : (
          <embed className="embededPDFViewr" src={URL.createObjectURL(documentToShow)} type="application/pdf" />
        )}
      </Container>
    </Container>
  );
}

export default PDFviewer;
