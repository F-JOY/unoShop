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
import { AdminVente } from "../components/ProfilAdminComponent/adminvente";
 export const ProfilAdmin =()=>{

  ///////////variable de gestion de rendrement des components//////////////////
const [clickClient,setClickClient]=useState(true)
const [clickFournis,setClickFournis]=useState(false)
const [clickProduit,setClickProduit]=useState(false)
const [clickCommande,setClickCommande]=useState(false)
const [clickCategorie,setClickCategorie]=useState(false)
const [clickVente,setClickVente]=useState(false)


 return(
    <>
    <Header />
    <Box height={60}></Box>
    <Box display={'flex'}>
  <Typography variant="h6" width="210px" sx={{borderRight:"solid",borderColor:"#F39200"}}fontSize={"23px" }>Admin DashBoard</Typography>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",  fontSize: clickClient ? "25px" : "18px",color: !clickClient ? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(true);setClickCommande(false);setClickFournis(false);setClickProduit(false);setClickCategorie(false);setClickVente(false)}} 
 >Clients</Link>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickFournis ? "23px" : "15px",color: !clickFournis ? "black" : "#F39200",}} 
 onClick={()=>{setClickClient(false);setClickCommande(false);setClickFournis(true);setClickProduit(false);setClickCategorie(false);setClickVente(false)}}
 >Fournisseurs</Link>
<Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickCommande ? "23px" : "15px",color: !clickCommande ? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(false);setClickCommande(true);setClickFournis(false);setClickProduit(false);setClickCategorie(false);setClickVente(false)}}
 >Commandes</Link>
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickCategorie? "23px" : "15px",color: !clickCategorie? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(false);setClickCommande(false);setClickFournis(false);setClickProduit(false);setClickCategorie(true);setClickVente(false)}}
 >Categories</Link>

 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickProduit ? "23px" : "15px",color: !clickProduit ? "black" : "#F39200"}}
 onClick={()=>{setClickClient(false);setClickCommande(false);setClickFournis(false);setClickProduit(true);setClickCategorie(false);setClickVente(false)}} 
 >Mes Produits</Link>
  
 <Link variant="h6" component="button" sx={{textDecoration:"none",color:"#F39200",margin:"10px",marginLeft:"100px",  fontSize: clickVente? "23px" : "15px",color: !clickVente? "black" : "#F39200"}} 
 onClick={()=>{setClickClient(false);setClickCommande(false);setClickFournis(false);setClickProduit(false);setClickCategorie(false);setClickVente(true)}}
 >Mes Vente</Link>
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
            clickCategorie?(
               <AdminCategoies/>
            ):(
              <AdminVente/>
            )
           
          )
          
        )
      )
     )}



    </>
 )

 }