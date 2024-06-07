import { Container, Paper, Stack, Typography, useTheme } from "@mui/material";
import { FaqArray } from "../../../Services/FAQ/FaqArray.ts";
import "./View.css";

function Faq() {
  const myTheme = useTheme();
  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Container className="FormFlexPostal">
        <Stack direction={"column"} className="LeftContent">
          <Typography className="ViewTitle" variant="h4">
            Preguntas Frecuentes:
          </Typography>
          <Container className="FaqMapContainer">
            {FaqArray.map((itm) => {
              return (
                <>
                  <Typography className="ViewSubTitle" variant="h6">
                    {itm.question}
                  </Typography>
                  <Typography className="ViewInfo" variant="body1">
                    {itm.answersContent}
                  </Typography>
                  <br />
                </>
              );
            })}
          </Container>
        </Stack>

        <Container className="RightContent FAQImagen" sx={{ backgroundImage: `url(${myTheme.palette.image.faq})` }}></Container>
      </Container>
    </Paper>
  );
}

export default Faq;
