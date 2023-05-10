import { Avatar, Grid, Box, Drawer, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/appBarF";
import { makeStyles } from "@mui/styles";

export const ProfilClient = () => {
  const [user, setUser] = useState([]);
  const [userPhoto, setUserPhoto] = useState();
  const [clickAchat, setClickAchat] = useState(false);
  const [clickFavorie, setClickFavorie] = useState(false);
  const [clickFornis, setClickFornis] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("photo")) {
      setUserPhoto(
        "http://localhost:3001/users/" + localStorage.getItem("photo")
      );
    }
    setUser(localStorage.getItem("user"));
  }, []);

  return (
    <>
      <Header cartData={[]} />
      <Box height={"50px"}></Box>
      <Grid container display={"flex"}>
        <Grid
          item
          md={3}
          display="block"
          height={"100%"}
          sx={{ boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.25)" }}
        >
          <Avatar
            src={userPhoto}
            sx={{
              height: "200px",
              width: "200px",
              margin: "auto",
              marginTop: "50px",
            }}
          ></Avatar> 
          <Typography variant="body1" marginTop={7} ml={2} fontSize="20px">Nom Prenom
          <Typography>
            {localStorage.getItem('type')}
          </Typography>
          </Typography>
         
        </Grid>
        <Grid item md={9} sx={{ msOverflowStyle: "hidden" }}>
          <Box
            display={"flex"}
            justifyContent="center"
            height="70px"
            sx={{
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            
          <Link
                variant="button"
                underline="hover"
                color={"gray"}
                sx={{
                  paddingTop: "25px",
                  paddingBottom: 0,
                  marginX: "80px",
                  height: 50,
                  paddingLeft: 1,
                  paddingRight: 1,
                  ":hover": { color: "#F39200" },
                }}
                onClick={() => {setClickAchat(true) ;setClickFavorie(false) ;setClickFornis(false)
                }}
              >
               Mes achat
              </Link>
              <Link
                variant="button"
                underline="hover"
                color={"gray"}
                sx={{
                  paddingTop: "25px",
                  paddingBottom: 0,
                  marginX: "80px",
                  height: 50,
                  paddingLeft: 1,
                  paddingRight: 1,
                  ":hover": { color: "#F39200" },
                }}
                onClick={() => {setClickAchat(false); setClickFavorie(true); setClickFornis(false)
                }}
              >
               Mes Favories
              </Link>

              <Link
                variant="button"
                underline="hover"
                color={"gray"}
                sx={{
                  paddingTop: "25px",
                  paddingBottom: 0,
                  marginX: "80px",
                  height: 50,
                  paddingLeft: 1,
                  paddingRight: 1,
                  ":hover": { color: "#F39200" },
                }}
                onClick={() => {setClickAchat(false);
                    setClickFavorie(false);
                    setClickFornis(true);
                }}
              >
               Mes Fournisseurs
              </Link>



          </Box>
          {clickAchat ? (
            <Typography>Achat</Typography>
          ) : clickFavorie ? (
            <Typography>Favorie</Typography>
          ) : (
            <Typography>fournisseurs</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};
