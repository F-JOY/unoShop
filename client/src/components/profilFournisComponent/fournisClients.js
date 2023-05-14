import React, { useEffect, useState } from "react";
import { Box, Avatar, Card, Typography, Button, Grid } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const FournisClient=()=>{
const [orders,setOrders]=useState([]);
const [clients,setClients]=useState([]);
useEffect(() => {
        getVente();
       
      }, []);
////////////////////////////////////////////////////////////////////////////////////
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
              setOrders(data.data);
              getVenteClient(data.data);
             console.log(data.data)
            
            } else {
              console.log(data);
            }
          } catch (error) {
            console.error(error);
          }
    }
///////////////////////////////recuperer les clients/////////////////////////////////////////////////////
const getVenteClient = async (orders) => {
    const client = orders.reduce((acc, order) => {
      const existingClient = acc.find(client => client._id === order.client._id);
      if (!existingClient) {
        acc.push({ ...order.client, duplicates: 1 });
      } else {
        existingClient.duplicates++;
      }
      return acc;
    }, []);
  
    setClients(client);
    console.log(client);
  };

    return (
<Grid container display={"flex"} spacing={3} ml={2} mt={1} width="100%">
      {clients.map((client, index) => (
        <Grid item sx={12} md={4}>
          <Card sx={{width:"300px"}}>
            <Box display={"flex"}>
            <Box display={"block"} marginLeft={2}>
              <Avatar sx={{height:"100px",width:"100px"}} >
                <img
                  src={"http://localhost:3001/users/" + client.photodeprofil}
                  height= "100px" width= "100px"
                />
              </Avatar>
              <Typography align="center" fontWeight={"bold"} >{client.nom}{"   "} {client.prenom}</Typography>
            </Box>
            <Box display={"block"} ml={2}>
                <Typography variant="h6" fontSize={"13px"} pb={1}>Information client</Typography>
               <Typography  display={"flex"} alignContent={"center"}  fontSize={"13px"}> <LocationOnIcon/>{client.adresse}</Typography>
               <Typography display={"flex"} alignContent={"center"}  fontSize={"13px"}> <EmailIcon />{client.email}</Typography>
               <Typography display={"flex"} alignContent={"center"}  fontSize={"13px"}> <CallIcon  />{client.numtel}</Typography>
               <Typography display={"flex"} alignContent={"center"}  fontSize={"13px"}>
                 Nombre d'Achat :
                 <Typography ml={"2px"} fontSize={"14px"} fontWeight={"bold"}> {client.duplicates}</Typography>
                
                 
                 </Typography>

            </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
    );
}