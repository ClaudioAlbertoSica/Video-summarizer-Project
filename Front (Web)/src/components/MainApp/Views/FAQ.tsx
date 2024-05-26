import { Container, Paper, Stack, Typography } from "@mui/material";

function Faq() {
  return (
    <Paper className="ViewWrapper" elevation={5}>
      <Container className="FormFlexPostal">
        <Stack direction={"column"} className="LeftContent">
          <Typography className="ViewTitle" variant="h4">
            Preguntas Frecuentes:
          </Typography>
          <Typography className="ViewSubTitle" variant="h6">
            ¿Lorem?
          </Typography>
          <Typography className="ViewInfo" variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ultricies lacus sed turpis tincidunt. Eget aliquet nibh praesent tristique magna sit amet. Ultrices gravida
            dictum fusce ut placerat orci nulla. Purus in mollis nunc sed id. Orci phasellus egestas tellus rutrum tellus
            pellentesque eu. At tellus at urna condimentum mattis pellentesque. Elementum curabitur vitae nunc sed velit. Tortor
            posuere ac ut consequat semper viverra nam libero. Vel turpis nunc eget lorem dolor sed viverra. Accumsan in nisl nisi
            scelerisque eu ultrices vitae auctor.
          </Typography>
          <Typography className="ViewSubTitle" variant="h6">
            ¿Ipsum?
          </Typography>
          <Typography className="ViewInfo" variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ultricies lacus sed turpis tincidunt. Eget aliquet nibh praesent tristique magna sit amet. Ultrices gravida
            dictum fusce ut placerat orci nulla. Purus in mollis nunc sed id. Orci phasellus egestas tellus rutrum tellus
            pellentesque eu. At tellus at urna condimentum mattis pellentesque. Elementum curabitur vitae nunc sed velit. Tortor
            posuere ac ut consequat semper viverra nam libero. Vel turpis nunc eget lorem dolor sed viverra. Accumsan in nisl nisi
            scelerisque eu ultrices vitae auctor.
          </Typography>
        </Stack>
        <Container className="RightContent FAQImagen"></Container>
      </Container>
    </Paper>
  );
}

export default Faq;
