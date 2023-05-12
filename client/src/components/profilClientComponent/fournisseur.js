import React, { useEffect, useState } from "react";
import { Box, Avatar, Card, Typography, Button, Grid } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export const MexFournisseur = () => {
  const [orders, setOrders] = useState([]);
  const [fournisseur, setFournisseur] = useState([]);
  useEffect(() => {
    getUserOrders();
    console.log(fournisseur);
  }, []);
  //////////////////////////get user orders////////////////////////
  const getUserOrders = async () => {
    try {
      const authToken = "Bearer " + localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/v1/order/orderbyusers",
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("orders seccusfuly gotten");
        console.log(data);
        setOrders(data.orders);
        getUserFournisseur(data.orders);
        /*     const orderItems = data.orders.map(order => order.orderItems);
        setOrderItems(prevOrderItems => [...prevOrderItems, ...orderItems]);*/
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  ///////////////////////recuperer les fournisseurs////////////////////
  const getUserFournisseur = (orders) => {
    const fournisseurs = [];

    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        fournisseurs.push(item.product.fournisseur);
      });
    }); ////////remove duplicates////////
    const fournis = fournisseurs.filter(
      (item, index) =>
        index === fournisseurs.findIndex((obj) => obj._id === item._id)
    );
    setFournisseur(fournis);
  };
  return (
    <Grid container display={"flex"} spacing={3} ml={2} mt={1} width="100%">
      {fournisseur.map((fournis, index) => (
        <Grid item sx={12} md={4}>
          <Card sx={{width:"300px"}}>
            <Box display={"flex"}>
            <Box display={"block"} marginLeft={2}>
              <Avatar sx={{height:"100px",width:"100px"}} >
                <img
                  src={"http://localhost:3001/users/" + fournis.photodeprofil}
                  height= "100px" width= "100px"
                />
              </Avatar>
              <Typography pl={2}>{fournis.nom}{"   "} {fournis.prenom}</Typography>
            </Box>
            <Box display={"block"} ml={2}>
                <Typography variant="h6" fontSize={"13px"} pb={1}>Information Fournisseur</Typography>
               <Typography  display={"flex"} alignContent={"center"}  fontSize={"13px"}> <LocationOnIcon/>{fournis.adresse}</Typography>
               <Typography display={"flex"} alignContent={"center"}  fontSize={"13px"}> <EmailIcon />{fournis.email}</Typography>
               <Typography display={"flex"} alignContent={"center"}  fontSize={"13px"}> <CallIcon  />{fournis.numtel}</Typography>
            </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
