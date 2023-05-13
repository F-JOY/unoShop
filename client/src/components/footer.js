import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import UnoV4 from "../images/UnoV4.png";
import { Grid, Typography, Box, Container, Link, Button } from "@mui/material";
import { padding, shadows } from "@mui/system";
import { createElement } from "react";
import { fontGrid } from "@mui/material/styles/cssUtils";

export default function Footer() {
  return (
    <footer>
      
      <Box
        sx={{
          position: "relative",
           backgroundColor:"white",
          bottom: "-7px",
        
         
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          paddingTop: "10px",
        }}
      >
        <Grid
          container
          spacing={4}
          display="flex"
          justifyContent={"left"}
          sx={{ paddingLeft: "10px" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <img src={UnoV4} alt="logo" width={100} height={40} />
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#292929", fontSize: "14px" }}
            >
              Obtenez les meilleurs offres et produits de qualité <br />
              grace a nos service d'affiliation
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sm={6}>
            <Box>
              <Grid display="flex" justifyContent="center">
                <LocationOnIcon display="inline" />

                <Typography
                  variant="body1"
                  component="p"
                  paddingLeft={"10px"}
                  paddingTop={"3px"}
                >
                  Algerie,Béjaia
                </Typography>
              </Grid>
              <Grid display="flex" justifyContent="center">
                <PhoneIcon display="inline" />

                <Typography
                  variant="body1"
                  component="p"
                  paddingLeft={"10px"}
                  paddingTop={"4px"}
                >
                  +21334164373
                </Typography>
              </Grid>
            </Box>
            <Grid display="flex" justifyContent="center" alignItems={"center"}>
              <Box>
                <Typography
                  display="flex"
                  justifyContent={"center"}
                  variant="body2"
                  component="p"
                  sx={{ fontSize: "10px", marginTop: "10px" }}
                >
                  OU
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    height:"30px", fontSize:"11px",
                    marginBottom:2,
                    backgroundColor: "#292929",
                    borderRadius: "15px",
                    ":hover": { backgroundColor: "#F39200" },
                  }}
                >
                  Contactez-nous
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sm={6} justifyContent="center">
            <Grid display="block" justifyContent="center" alignItems="stretch">
              <Typography
                display="flex"
                justifyContent={"center"}
                variant="body1"
                component="p"
                paddingTop="3px"
              >
                A propos
              </Typography>

              <Typography
                display="flex"
                justifyContent={"center"}
                variant="body1"
                component="p"
                paddingTop="4px"
              >
                Terms &amp; Conditions
              </Typography>
              <Typography
                display="flex"
                justifyContent={"center"}
                variant="body2"
                component="p"
                sx={{ fontSize: "10px", marginTop: "10px" }}
              >
                suivez-nous
              </Typography>
              <Grid display="flex" justifyContent={"center"}>
                <Link href="#">
                  <FacebookIcon
                    htmlColor="#292929"
                    sx={{ fontSize:"30px",":hover": { color: "#F39200" }, marginRight: 2 }}
                  />
                </Link>
                <Link href="#">
                  <TwitterIcon
                    htmlColor="#292929"
                    sx={{ fontSize:"30px",":hover": { color: "#F39200" }, mr: 2 }}
                  />
                </Link>
                <Link href="#">
                  <InstagramIcon
                    htmlColor="#292929"
                    sx={{ fontSize:"30px",":hover": { color: "#F39200" }, mr: 2 }}
                  />
                </Link>
                <Link href="#">
                  <TelegramIcon
                    htmlColor="#292929"
                    sx={{fontSize:"30px", ":hover": { color: "#F39200" } }}
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box style={{ height: "2px", backgroundColor: "#F39200" }}></Box>
        <Box display="flex" justifyContent="center" color="#292929">
          <Typography variant="body2">
            Copyright &copy; UnoTeam 2023 - Tous droits réservés
          </Typography>
        </Box>
      </Box>
    </footer>
  );
}
