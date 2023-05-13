import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import React from "react";
import serviceAchat from "../images/seviceAchat.png";
import serviceVente from "../images/serviceVente.png";
import serviceAffiliation from "../images/serviceAffiliation.png";
export const About = () => {
  return (
    <Box display="block">
      <Box
        marginBottom={1}
        style={{ height: "2px", backgroundColor: "#F39200" }}
      ></Box>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        align="center"
        marginBottom={5}
      >
        {" "}
        Nos Services
      </Typography>
      <Grid container spacing={4} display="flex">
        <Grid item xs={12} md={4} sm={6}>
          <Card sx={{ height: "320px" }}>
            <Typography variant="h6"  align="center">
            Achat en Ligne
            </Typography>
            <Grid container display={"flex"}>
              <Grid item xs={6} sm={9} md={6}>
                <Typography variant="body2" color="text.secondary"  m={2}>
                UnoShop permet de découvrir une grande variété de produits de
              qualité dans de nombreux domaines. Nous sommes constamment à la
              recherche des dernières tendances et des meilleurs produits pour
              répondre à vos besoins. Nous sommes fiers de vous offrir une
              expérience d'achat en ligne agréable et sans souci.
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={6}>
                <Box
                  height={"100%"}
                  width="100%"
                  sx={{
                    backgroundImage: `url(${serviceAchat})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Card>

        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <Card sx={{ height: "320px" }}>
            <Typography variant="h6"  align="center">
              Vente en Ligne
            </Typography>
            <Grid container display={"flex"}>
              <Grid item xs={6} sm={9} md={6}>
                <Typography variant="body2" color="text.secondary" m={2}>
                  UnoShop permet de vendre vos produits rapidement et
                  facilement. Nous offrons une plateforme en ligne sécurisée qui
                  vous permet gerer vos ventes en ligne efficacement. Nous
                  sommes fiers d'offrir une expérience de vente en ligne
                  agréable et sans souci pour nos vendeurs
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={6}>
                <Box
                  height={"100%"}
                  width="100%"
                  sx={{
                    backgroundImage: `url(${serviceVente})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sm={6}>
          <Card sx={{ height: "320px" }}>
            <Typography variant="h6"  align="center">
              Service d'Affiliation
            </Typography>
            <Grid container display={"flex"}>
              <Grid item xs={6} sm={9} md={6}>
                <Typography variant="body2" color="text.secondary" m={2}>
                  Notre programme d'affiliation est un excellent moyen de gagner
                  de l'argent en faisant la promotion de nos produits auprès de
                  votre réseau.Nous sommes fiers de notre programme
                  d'affiliation et nous offrons une assistance personnalisée à
                  nos affiliés pour les aider à réussir.
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} md={6}>
                <Box
                  height={"100%"}
                  width="100%"
                  sx={{
                    backgroundImage: `url(${serviceAffiliation})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
