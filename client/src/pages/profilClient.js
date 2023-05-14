import {
  Avatar,
  Grid,
  Box,
  Drawer,
  Link,
  Typography,
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/appBarF";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from '@mui/icons-material/Logout';
import { Achat } from "../components/profilClientComponent/Achat";
import { MexFournisseur } from "../components/profilClientComponent/fournisseur";
import { ClientProfil } from "../components/profilClientComponent/ClientProfil";
import { ClientFavoris } from "../components/profilClientComponent/ClientFavorie";
export const ProfilClient = () => {

  /////////////variable de gestion d'affichage des components///////
  const [clickProfil, setClickProfil] = useState(true);
  const [clickAchat, setClickAchat] = useState(false);
  const [clickFavorie, setClickFavorie] = useState(false);
  const [clickFornis, setClickFornis] = useState(false);
  const [fournisseurs,setFrounisseur]=useState([]);
  

  return (
    <>
      <Header cartData={[]} />
    
      <Box height={60}></Box>
          <Box display={"flex"} >
          <Typography variant="h6" width="100px" sx={{borderRight:"solid",borderColor:"#F39200"}}fontSize={"23px" }>Client</Typography>
          <Link
              variant="h6" component="button"
              underline="none"
              sx={{
                margin:"10px",
                color: clickProfil ? "#F39200" : "black",
                fontSize: clickProfil ? "23px" : "15px"
              }}
              onClick={() => { 
                setClickProfil(true)
                setClickAchat(false);
                setClickFavorie(false);
                setClickFornis(false);
              }}
             
            >
             Mon profil
            </Link>
            <Link
              variant="h6" component="button"
              underline="none"
              sx={{
                margin:"10px",marginLeft:"100px",
                color: clickAchat ? "#F39200" : "black",
                fontSize: clickAchat ? "23px" : "15px"
              }}
              onClick={() => { 
                setClickProfil(false)
                setClickAchat(true);
                setClickFavorie(false);
                setClickFornis(false);
              }}
             
            >
              Mes achat
            </Link>
            <Link
               variant="h6" component="button"
              underline="none"
              color={"black"}
              sx={{
                margin:"10px",marginLeft:"100px",
                color: clickFavorie ? "#F39200" : "black",
                fontSize: clickFavorie ? "23px" : "15px",
                
              }}
              onClick={() => {
                setClickProfil(false)
                setClickAchat(false);
                setClickFavorie(true);
                setClickFornis(false);
              }}
            >
              Mes Favories
            </Link>
            <Link
              variant="h6" component="button"
              underline="none"
              color={"black"}
              sx={{
                margin:"10px",marginLeft:"100px",
                color: clickFornis ? "#F39200" : "black",
                fontSize: clickFornis ? "23px" : "15px",
             
              }}
              onClick={() => {
                setClickProfil(false)
                setClickAchat(false);
                setClickFavorie(false);
                setClickFornis(true);
              }}
            >
              Mes Fournisseurs
            </Link>
          </Box>
         
          {clickAchat ? (
           <Achat />
          ) : clickFavorie ? (
           <ClientFavoris/>
          ) : clickFornis ?(
            <MexFournisseur/>
          ):clickProfil?(
            <ClientProfil/>
          ):(
            <></>

          ) }
       
    </>
  );
};
