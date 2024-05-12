import { useContext, useEffect, useState } from "react";
import server from "../../../Services/serverCall.ts";
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
  const activeUSer = useContext(LoggedUserContext);
  const [documentToShow, setDocumentToShow] = useState<Blob>(new Blob());

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
          console.log(`then : ${activeUSer.userState.selectedSummary.idRes} + ${activeUSer.userState.selectedSummary.idRes}`);
          setDocumentToShow(base64toBlob(res.data.pdf.data));
        })
        .catch((err) => console.log(err.error));
    };
    call();
  }, [activeUSer.userState.selectedSummary]);

  return (
    <div>
      <embed src={URL.createObjectURL(documentToShow)} title="Titulo" type="application/pdf" width="100%" height="600px" />
    </div>
  );
}

export default PDFviewer;
