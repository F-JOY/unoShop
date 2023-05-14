import React, { useEffect,useState } from "react";
import { Grid, Typography,Box, TextField,InputLabel, Button, Table,IconButton,DialogContent,Dialog,DialogActions, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, } from "@mui/material";

export const FournisVente=()=>{
const [shouldUpdate, setShouldUpdate] = useState(false);
const [ordres,setOrders]= useState([]);

useEffect(()=>{
getVente();
},[])


///////////////////////////////recupere les ventes du fournisseur//////////////////////
const getVente = async () => { 
    const authToken = "Bearer " + localStorage.getItem("token");
    
    try {
        const response = await fetch(
          "http://localhost:3001/api/v1/order/orderfournisseur",
          {
            method: "GET",
            headers: {
                   Authorization: authToken,
              },
             
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("les ventes");
          //console.log(data.data);
          setOrders(data.data)
         
        
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
}

///////////////////////////traitement de la date///////////////////////
const dateChanger = (createDate) => {
  const date = new Date(createDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
 return(
      <>
     
       <Table>
        <TableHead>
          <TableRow sx={{ borderBottom:"solid" ,borderBottomWidth:"2px",borderBottomColor:"#F39200" }}>
          <TableCell align="center" sx={{ fontSize: "20px" }}>
             Num
            </TableCell>
            <TableCell align="center" sx={{ fontSize: "20px" }}>
             Produit
            </TableCell>
            <TableCell align="center" sx={{ fontSize: "20px" }}>
              Quantite vendue
            </TableCell>
            <TableCell align="center" sx={{ fontSize: "20px" }}>
              Prix Total
            </TableCell>
            <TableCell  align="center" sx={{ fontSize: "20px" }}>
              Date vente
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {ordres.map((order, index) => (
            <TableRow key={index} sx={{ borderBottom: "solid" , borderBottomWidth:"2px" }}>
              <TableCell align="center">{index+1}</TableCell>

              <TableCell align="center">
              <Box display={"flex"} justifyContent="center">
                  <img src={"http://localhost:3001/products/"+order.produit.imageCover} alt="" style={{width:"60px",height:"50px",borderRadius:"10px"}}/>
                <Box display={"block"}>
                  <Typography variant="h6">{order.produit.name}</Typography>
                  <Box display={"flex"}>
                   <Typography display={"flex"} variant="body2" mr={2}>Prix :
                   <Typography variant="body1" fontWeight={"bold"}>{order.produit.nouveauprix}{" "}DA</Typography>
                   </Typography>
                   <Typography display={"flex"} variant="body2" mr={1}>Reste :
                   <Typography variant="body1" fontWeight={"bold"}>{order.produit.quantite}</Typography>
                   </Typography>
                  </Box>
                 

                </Box>
              </Box>

              </TableCell>

              <TableCell align="center">{order.quantite}</TableCell>
              <TableCell align="center">{order.prixTotal}</TableCell>
              
              <TableCell align="center">{dateChanger(order.date)}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    
    );
   }



