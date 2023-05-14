import React,{useStat, useState} from "react";
import Header from "../components/appBarF";
import {
    Grid,
    Box,
    Drawer,
    Link,
    Typography,
    Button,
  } from "@mui/material";
import { FournisClient } from "../components/profilFournisComponent/fournisClients";
import { FournisProduit } from "../components/profilFournisComponent/fournisProd";
import { FournisVente } from "../components/profilFournisComponent/FournisVente";
import { FournisProfil } from "../components/profilFournisComponent/Fournisprofil";

 export const ProfilFournis =()=>{
const [clickClient,setClickClient]=useState(false)
const [clickProduit,setClickProduit]=useState(false)
const [clickProfil,setClickProfil]=useState(true)
const [clickVente,setClickVente]=useState(false)


 return(
    <>
    <Header />
    <Box height={60}></Box>
    <Box display={'flex'}>
  <Typography variant="h6" width="210px" sx={{borderRight:"solid",borderColor:"#F39200"}}fontSize={"23px" }>Fournisseur</Typography>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",  fontSize: clickProfil ? "25px" : "18px",color: !clickProfil ? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(false);setClickProfil(true);setClickProduit(false);setClickVente(false)}} 
 >Mon Profil</Link>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickProduit ? "23px" : "15px",color: !clickProduit ? "black" : "#F39200",}} 
 onClick={()=>{setClickClient(false);setClickProfil(false);setClickProduit(true);setClickVente(false)}}
 >Mes Produits</Link>
<Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickVente ? "23px" : "15px",color: !clickVente ? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(false);setClickProfil(false);setClickProduit(false);setClickVente(true)}}
 >Mes ventes</Link>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickClient? "23px" : "15px",color: !clickClient? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(true);setClickProfil(false);setClickProduit(false);setClickVente(false)}}
 >Mes Clients</Link>

 </Box>
     {clickClient?(
      <FournisClient/>
     ):(
      clickProduit?(
        <FournisProduit/>
      ):(
        clickVente?(
            <FournisVente/>
        ):(
          clickProfil?( 
            <FournisProfil/>
          ):(
           <></>
           
          )
          
        )
      )
     )}



    </>
 )

 }
 
 
 
 