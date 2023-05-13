import React, { useEffect, useState } from "react";
import {
    Avatar,
    Grid,
    Box,
    Drawer,
    Link,
    Typography,
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  } from "@mui/material";

export const AdminCommande=()=>{
const [orders,setOrders]=useState([]);
const [shouldUpdate, setShouldUpdate] = useState(false);
useEffect(()=>{
    getOrders();
},[shouldUpdate])

////////////////////////////////get All orders/////////////////////
const getOrders= async()=>{ 
    try {
        const response = await fetch(
          "http://localhost:3001/api/v1/order",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("All orders gotten");
          console.log(data.data);
          setOrders(data.data)
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
};

//////////////////////////traitement de ta date de la commande//////////////////////
const dateChanger = (createDate) => {
    const date = new Date(createDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
////////////////////////////////valider une commande////////////////////
const setOrderStatus = async (id) => { 
    const authToken = "Bearer " + localStorage.getItem("token");
    
    try {
        const response = await fetch(
          "http://localhost:3001/api/v1/order/"+id,
          {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
              },
              body: JSON.stringify({
                status: "Valider"
              })
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("order validated");
          console.log(data);
          setShouldUpdate(!shouldUpdate);
        
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }


}
    return(
        <Grid md={12} xs={12} >
        <TableContainer>
        <Table>
        <TableHead>
          <TableRow sx={{ borderBottom:"solid" ,borderBottomWidth:"2px",borderBottomColor:"#F39200" }}>
          <TableCell sx={{ fontSize: "20px",width:"20px" }}>
             Num
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
             Client
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
              Adresse
            </TableCell>
           
            <TableCell sx={{ fontSize: "20px" }}>
             Telephone
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }} align="center">
            Produits
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
                Total
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
            Date
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
            Etat
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index} sx={{ borderBottom: "solid" , borderBottomWidth:"2px" }}>
              <TableCell align="center" sx={{width:"20px"}}>{index+1}</TableCell>
              <TableCell >{order.user.nom} {order.user.prenom}</TableCell>
              <TableCell >{order.adresse}</TableCell>
              <TableCell >{order.telephone}</TableCell>
              <TableCell>
                {order.orderItems.map((item,key)=>(
                    <Table key={key}>
                        <TableBody>
                            <TableCell align="center">
                            <Box display={"flex"}>
                             
                                
                                <Box display={"block"} paddingLeft={2}>
                                <Box display={"flex"}>
                                  {item.product ? (
                                      <> 
                                      {item.product.imageCover !=null ?(
                                      <img src={"http://localhost:3001/products/" + item.product.imageCover} alt=""  width="40"/>
                                  ):(
                                        <>  </>
                                  )}
                                   <Typography variant="h6" pl={2} pt={1}>{item.quantite}</Typography>
                                {item.product.name && item.product.fournisseur && item.product.nouveauprix?(
                                      <Box display={"block"} paddingLeft={2}>
                                    <Typography align="center"> {item.product.name} {" prix: "} {item.product.nouveauprix}DA</Typography>
                                    <Typography>De :{item.product.fournisseur.nom}{"  "}{item.product.fournisseur.prenom}</Typography>
                                </Box>
                                  ):(
                                        <>
                                        <Typography>Undifiend</Typography>
                                        </>
                                  )}
                                      </>
                                  ):(
                                    <></>
                                  )}
                                 
                               
                               
                                
                                </Box>
                                 
                                </Box>
                                
                                </Box>
                               
                            </TableCell>
                        </TableBody>
                    </Table>
                ))}
              </TableCell>
              <TableCell>
                {order.prixTotal} DA
            </TableCell>              
             <TableCell > {dateChanger(order.createdAt)}</TableCell>
              <TableCell sx={{fontStyle:"revert", color: order.etat=="Valider"? "green":"red"}} >
                {order.etat}
                </TableCell>
              <TableCell >
                {order.etat==="Refuser"?(
            <Button variant="contained" sx={{fontSize:"15px",backgroundColor:"#0049f2"}}
                    onClick={()=>{setOrderStatus(order._id)}}
            >valider</Button>
                ):(
                    <></>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    );
}