import React, { useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Grid, Typography,Box, TextField,InputLabel, Button, Table,IconButton,DialogContent,Dialog,DialogActions, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, } from "@mui/material";
export const AdminProduit=()=>{
const [product,setProduct]=useState([]) ;
const [prodName,setProdName]=useState("");
const [prodId,setProdId]=useState("");
const [open, setOpen] = useState(false);
const [shouldUpdate, setShouldUpdate] = useState(false);
const [deletClicked,setDeletClicked]=useState(false);
useEffect(()=>{
    getUserProduct();
},[shouldUpdate])//executer si un changement des produits lors de la suppression

///////////////////////////dialogue de suppression ///////////////////////////
const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setProdId("")
  setProdName("")
  setOpen(false);
};
/////////////////////grt product by fournisseur////////////////////
const getUserProduct= async()=>{ 
    try {
        const authToken = "Bearer " + localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:3001/api/v1/products/proprietaire/"+localStorage.getItem("userId"),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("produit recuperer avec succes");
          console.log(data.data);
          setProduct(data.data)
       
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
};
////////////////////////////supprimer produit///////////////////////
const deleteProduct = async () => {
    const authToken = "Bearer " + localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3001/api/v1/products/"+prodId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          }, 
      });
        setShouldUpdate(!shouldUpdate);
        setDeletClicked(false);
        handleClose();
      
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
    <TableContainer>
        <Table>
        <TableHead>
          <TableRow sx={{ borderBottom:"solid" ,borderBottomWidth:"2px",borderBottomColor:"#F39200" }}>
          <TableCell sx={{ fontSize: "20px" }}>
             Num
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
             Nom produit
            </TableCell>
            <TableCell width={"200px"} sx={{ fontSize: "20px" }}>
            description
            </TableCell>
            <TableCell  sx={{ fontSize: "20px" }}>
              Ancien prix
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
             Nouvau prix
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
              Quantite
            </TableCell>
            <TableCell sx={{ fontSize: "20px" }}>
            Date d'Ajout
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((prod, index) => (
            <TableRow key={index} sx={{ borderBottom: "solid" , borderBottomWidth:"2px" }}>
              <TableCell >{index+1}</TableCell>
              <TableCell align="center">
                <img  src={"http://localhost:3001/products/"+prod.imageCover} alt="" height={"40px"} width={"40px"}/>
                <Typography >{prod.name}
            </Typography>
                </TableCell>
              <TableCell >{prod.description}</TableCell>
              <TableCell align="center">{prod.ancienprix}</TableCell>
              <TableCell align="center">{prod.nouveauprix}</TableCell>
              <TableCell align="center">{prod.quantite}</TableCell>
              <TableCell > {dateChanger(prod.createdAt)}</TableCell>
              <TableCell ><Button variant="contained" sx={{width:"10px",fontSize:"10px"}}>Modifier</Button></TableCell>
              <TableCell >
              <Button variant="contained" sx={{backgroundColor: "#ff3a31",width:"10px",fontSize:"10px"}}
               onClick={()=>{setDeletClicked(true);setProdName(prod.name);setProdId(prod._id);handleOpen()}}
              >Supprimer</Button>
                
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={open} onClose={handleClose} maxWidth="md">
          <DialogActions sx={{ height: "20px" }}>
            <IconButton>
              <CancelRoundedIcon onClick={handleClose} />
            </IconButton>
          </DialogActions>
        
            <DialogContent>
            <Box display="bolck">
              <Typography variant="body1">voullez vous vriment supprimer ce produit
              </Typography>
              <Typography variant="h6" align="center" fontWeight={"bold"} color={""}>{prodName}</Typography>
              <Box display="flex" justifyContent="Right" marginTop={3}>
                <Button  variant="contained" sx={{backgroundColor:"gray",marginRight:"10px"}}
                onClick={()=>{handleClose()}}
                >non</Button>
                <Button  variant="contained" sx={{backgroundColor:"#ff3a31",marginLeft:"10px"}} 
                 onClick={()=>{deleteProduct()}}
                 >oui</Button>
              </Box>
              </Box>
            </DialogContent>
        
        </Dialog>
   </>
    );
}