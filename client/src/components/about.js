import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import React from "react";
export const About = () => {
  return (
    <Box display="block">
      <Typography variant="h3" align="center" marginBottom={3}>
        {" "}
        Nos Services
      </Typography>
      <Box
        marginBottom={5}
        style={{ height: "2px", backgroundColor: "#F39200" }}
      ></Box>
      <Grid container spacing={4} display="flex">
        <Grid item xs={12} md={4} sm={6}>
          <Card sx={{height:"200px"}}>
              <Typography variant="h5" mb={2} ml={3}>
                Achat en Ligne
              </Typography>
               
              <Typography  variant="body2" color="text.secondary" m={2}>
                UnoShop permet de découvrir une grande variété de produits de
                qualité dans de nombreux domaines. Nous sommes constamment à la
                recherche des dernières tendances et des meilleurs produits pour
                répondre à vos besoins. Nous sommes fiers de vous offrir une
                expérience d'achat en ligne agréable et sans souci.
              </Typography>
           
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <Card sx={{height:"200px"}}>
            <Typography variant="h5" mb={2} ml={3}>
              Vente en Ligne
            </Typography>
            <Typography  variant="body2" color="text.secondary" m={2}>
              UnoShop permet de vendre vos produits rapidement et facilement.
              Nous offrons une plateforme en ligne sécurisée qui vous permet
              gerer vos ventes en ligne efficacement. Nous sommes fiers d'offrir
              une expérience de vente en ligne agréable et sans souci pour nos
              vendeurs
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sm={6}>
         
          <Card sx={{height:"200px"}}>
            <Typography variant="h5" ml={2} mb={2}>
              Service d'Affiliation
            </Typography>
            <Typography  variant="body2" color="text.secondary"  m={2}>
              Notre programme d'affiliation est un excellent moyen de gagner de
              l'argent en faisant la promotion de nos produits auprès de votre
              réseau.Nous sommes fiers de notre programme d'affiliation et nous
              offrons une assistance personnalisée à nos affiliés pour les aider
              à réussir.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
