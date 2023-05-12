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
import { AdminClient } from "../components/ProfilAdminComponent/adminClient";
import { AdminFournisseur } from "../components/ProfilAdminComponent/adminFournis";
import { AdminProduit } from "../components/ProfilAdminComponent/adminProduct,";
import { AdminCommande } from "../components/ProfilAdminComponent/adminCommand";
import { AdminCategoies } from "../components/ProfilAdminComponent/adminCategories";
 export const ProfilAdmin =()=>{
const [clickClient,setClickClient]=useState(true)
const [clickFournis,setClickFournis]=useState(false)
const [clickProduit,setClickProduit]=useState(false)
const [clickCommande,setClickCommande]=useState(false)
const [clickCategorie,setClickCategorie]=useState(false)


 return(
    <>
    <Header />
    <Box height={60}></Box>
    <Box display={'flex'}>
  <Typography variant="h6" width="210px" sx={{borderRight:"solid",borderColor:"#F39200"}}fontSize={"25px" }>Admin DashBoard</Typography>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",  fontSize: clickClient ? "25px" : "18px",color: !clickClient ? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(true);setClickCommande(false);setClickFournis(false);setClickProduit(false);setClickCategorie(false)}} 
 >Clients</Link>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickFournis ? "25px" : "18px",color: !clickFournis ? "black" : "#F39200",}} 
 onClick={()=>{setClickClient(false);setClickCommande(false);setClickFournis(true);setClickProduit(false);setClickCategorie(false)}}
 >Fournisseurs</Link>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickProduit ? "25px" : "18px",color: !clickProduit ? "black" : "#F39200"}}
 onClick={()=>{setClickClient(false);setClickCommande(false);setClickFournis(false);setClickProduit(true);setClickCategorie(false)}} 
 >Produits</Link>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickCommande ? "25px" : "18px",color: !clickCommande ? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(false);setClickCommande(true);setClickFournis(false);setClickProduit(false);setClickCategorie(false)}}
 >Commandes</Link>
  <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickCategorie? "25px" : "18px",color: !clickCategorie? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(false);setClickCommande(false);setClickFournis(false);setClickProduit(false);setClickCategorie(true)}}
 >Categories</Link>
 </Box>
     {clickClient?(
      <AdminClient/>
     ):(
      clickFournis?(
        <AdminFournisseur/>
      ):(
        clickProduit?(
          <AdminProduit/>
        ):(
          clickCommande?( 
            <AdminCommande/>
          ):(
            <AdminCategoies/>
          )
          
        )
      )
     )}



    </>
 )

 }